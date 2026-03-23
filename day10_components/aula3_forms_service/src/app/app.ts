import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateForm } from './components/template-form/template-form';
import { ReactiveForm } from "./components/reactive-form/reactive-form";
import { Signal } from "./components/signal/signal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemplateForm, ReactiveForm, Signal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aula3_forms_service');
}
