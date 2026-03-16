import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Botao } from "./components/botao/botao";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Botao],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Aula02_Componente');
}
