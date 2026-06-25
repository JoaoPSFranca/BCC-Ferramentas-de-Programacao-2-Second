import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OsService } from '../../services/os.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-service-order-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonList,
  ],
  templateUrl: './service-order-form.html',
  styleUrl: './service-order-form.scss',
})
export class ServiceOrderForm {
  private fb = inject(NonNullableFormBuilder);
  protected osService = inject(OsService);
  private router = inject(Router);

  protected modoInspecao = false;
  protected fichaCadastrada: any = null;

  // Form da Cabeça da OS
  protected formOS = this.fb.group({
    vehiclePlate: [
      '',
      [Validators.required, Validators.pattern('[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}|[A-Z]{3}-[0-9]{4}')],
    ],
    openingDate: [new Date().toISOString().split('T')[0], Validators.required],
  });

  // Form temporário para adicionar itens no carrinho inferior
  protected formItem = this.fb.group({
    serviceId: [0, [Validators.required, Validators.min(1)]],
    quantityHours: [1, [Validators.required, Validators.min(1)]],
  });

  // Carrinho de serviços manipulado em memória
  protected listaItensAdicionados: {
    serviceId: number;
    quantityHours: number;
    descricao?: string;
    precoBase?: number;
  }[] = [];

  constructor() {
    const estadoNavegacao = this.router.currentNavigation()?.extras.state;
    if (estadoNavegacao) {
      this.modoInspecao = true;
      this.fichaCadastrada = estadoNavegacao;
      this.formOS.patchValue(estadoNavegacao);
      this.formOS.disable(); // Trava a digitação
    }
  }

  ngOnInit() {
    if (!this.modoInspecao) {
      this.osService.getServices();
    }
  }

  protected colocarNoCarrinho() {
    if (this.formItem.valid) {
      const idServico = Number(this.formItem.value.serviceId);
      const qtdHoras = Number(this.formItem.value.quantityHours);
      const servicoReferencia = this.osService.servicosCatalogo().find((s) => s.id === idServico);

      this.listaItensAdicionados.push({
        serviceId: idServico,
        quantityHours: qtdHoras,
        descricao: servicoReferencia?.description,
        precoBase: servicoReferencia?.basePrice,
      });

      this.formItem.reset({ quantityHours: 1, serviceId: 0 });
    }
  }

  protected removerDoCarrinho(indice: number) {
    this.listaItensAdicionados.splice(indice, 1);
  }

  protected dispararOrdem() {
    if (this.formOS.valid && this.listaItensAdicionados.length > 0) {
      const payloadBruto = {
        vehiclePlate: this.formOS.value.vehiclePlate,
        openingDate: this.formOS.value.openingDate,
        items: this.listaItensAdicionados.map((item) => ({
          serviceId: item.serviceId,
          quantityHours: item.quantityHours,
        })),
      };

      this.osService.createOs(payloadBruto).subscribe({
        next: () => {
          this.osService.getOrders();
          this.router.navigate(['/os-list']);
        },
        error: (err) => alert('Erro na API: ' + err.message),
      });
    } else {
      alert('Preencha a placa e adicione ao menos um serviço no carrinho!');
    }
  }

  protected voltar() {
    this.router.navigate(['/os-list']);
  }
}
