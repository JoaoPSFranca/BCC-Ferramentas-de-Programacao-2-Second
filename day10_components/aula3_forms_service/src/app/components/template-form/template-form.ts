import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Pessoa } from '../../models/pessoa.model';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-form.html',
  styleUrl: './template-form.css',
})
export class TemplateForm {
  // Interface
  // protected pessoa: Pessoa = {
  //   nome: '',
  //   email: '',
  // };
  
  // Classe
  protected pessoa: Pessoa = new Pessoa();
  protected pessoaService = inject(PessoaService);

  salvar(form: NgForm) {
    console.log("Formulário Salvo");

    if (form.invalid) return;

    this.pessoaService.adicionar(this.pessoa);
    this.pessoa = new Pessoa();
    console.log(this.pessoaService.obterTodas());

    form.reset();
  }
}