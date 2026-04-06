import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Filho } from './components/filho/filho';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Filho],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected mostrar = true;
}
