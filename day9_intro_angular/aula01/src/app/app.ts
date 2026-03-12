import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected title: string = "Aula 01";
  protected count: number = 0;
  protected names: string[] = ["Ana", "João", "Pedro", "Gabriel", "Bruna"].sort();

  protected getSubTitle() {
    return "Introdução ao angular";
  }

  protected show() {
    alert("Otário");
  }

  protected upCount() {
    this.count++;
  }

  protected downCount() {
    this.count--;
  }

  protected removeFirst() {
    this.names.shift();
  }

  protected removeLast() {
    this.names.shift();
  }

  protected removeClicked(index: number) {
    this.names.splice(index, 1);
  }
}
