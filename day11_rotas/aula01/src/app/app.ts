import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page1 } from "./pages/page1/page1";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aula01');
}
