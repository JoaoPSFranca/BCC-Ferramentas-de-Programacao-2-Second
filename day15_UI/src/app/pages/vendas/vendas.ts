import { Component, inject, OnInit } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Venda } from '../../models/venda.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-vendas',
  imports: [TableModule, DatePipe, IconField, InputIcon, InputText, Button],
  templateUrl: './vendas.html',
  styleUrl: './vendas.scss',
})
export class Vendas {
  private vendaService = inject(VendaService);
  protected vendas: Venda[] = [];
  protected selectedVenda: Venda | null = null;

  constructor() {
    this.loadVendas();
  }

  protected loadVendas() {
    this.vendaService.getAll().subscribe((vendas) => {
      this.vendas = vendas;
    });
  }

  protected removeVenda() {
    if (!this.selectedVenda) {
      return;
    }

    const vendaId = this.selectedVenda.id;

    this.vendaService.remove(vendaId).subscribe(() => {
      this.selectedVenda = null;
    });

    this.loadVendas();
  }
}
