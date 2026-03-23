import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [JsonPipe],
  templateUrl: './signal.html',
  styleUrl: './signal.css',
})
export class Signal {
  protected exemploCount = signal(0);
  protected exemploObj = signal({
    nome: "Ana",
    idade: 20
  });

  protected executar() {
    // Altera para 10
    // this.exemploCount.set(10);

    // Altera a partir do valor atual
    this.exemploCount.update(atual => ++atual)
    // Poderia ser feito assim também mas não é recomendado:
    // this.exemploCount.set(this.exemploCount() + 1) 

    // Isso é a mesma coisa que o de cima:
    // this.exemploCount.update( (valor) => {
    //   return ++valor;
    // });

    // Mesma Coisa com o objeto
    this.exemploObj.set({
      nome: "Jose",
      idade: 40
    });

    this.exemploObj.update((atual) => { 
      return {
        ...atual,
        nome: atual.nome.toUpperCase()
      }
    });

  }

}
