import { Component, inject } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Venda } from '../../models/venda.model';

@Component({
  selector: 'app-vendas',
  imports: [AsyncPipe, TableModule, DatePipe, IconField, InputIcon, InputText],
  templateUrl: './vendas.html',
  styleUrl: './vendas.scss',
})
export class Vendas {
  private vendaService = inject(VendaService);
  protected vendas$ = this.vendaService.getAll();
  protected selectedVenda!: Venda;

  constructor() {
    console.log(this.vendas$);
  }

  protected test() {
    console.log(this.selectedVenda);
  }
}
