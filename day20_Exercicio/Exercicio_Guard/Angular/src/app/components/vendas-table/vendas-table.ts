import { Component, input, output } from '@angular/core';
import { Venda } from '../../model/venda.model'
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vendas-table',
  imports: [DatePipe],
  templateUrl: './vendas-table.html',
  styleUrl: './vendas-table.scss',
})
export class VendasTable {

  public vendas = input.required<Venda[]>();
  //executar um método no componente pai
  // public executar = output(); //Sem parâmetro
  // public executar = output<number>(); //Parâmetro primitivo

  // Objeto como parâmetro
  // public executar = output<{id: number, nome: string}>();
  protected executar = output<Venda>();

  protected removerClick(venda: Venda) {
    // this.executar.emit(codigo);
    // this.executar.emit({id: codigo, nome: ""});
    this.executar.emit(venda);
  }

}
