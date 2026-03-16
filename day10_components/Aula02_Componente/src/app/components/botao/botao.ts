import { Component } from '@angular/core';

@Component({
  selector: 'app-botao',
  imports: [],
  templateUrl: './botao.html',
  styleUrl: './botao.css',
})
export class Botao {
  public titulo: string = '';
  public cor: string = '';

  public corFundo() {
    return this.cor;
  }
}
