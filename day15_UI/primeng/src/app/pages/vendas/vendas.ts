import { Component, inject } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-vendas',
  imports: [AsyncPipe, TableModule, DatePipe],
  templateUrl: './vendas.html',
  styleUrl: './vendas.scss',
})
export class Vendas {
  private vendaService = inject(VendaService);
  protected vendas$ = this.vendaService.getAll();

  constructor() {
    console.log(this.vendas$);
  }
}
