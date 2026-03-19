import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private pessoas: Pessoa[] = [];

  public adicionar(pessoa: Pessoa){
    this.pessoas.push(pessoa);
  }

  public obterTodas(){
    return this.pessoas;
  }

  // public remover(pessoa: Pessoa){
  //   this.pessoas;
  // }
}
