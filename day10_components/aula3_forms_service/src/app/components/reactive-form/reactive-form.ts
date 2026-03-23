import { Component, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  constructor() {}
  
  // Sem tipo = any any any | Serve para compatibilidade com os antigos
  // private formBuilder = inject(UntypedFormBuilder);

  // Com tipo, normal
  // private formBuilder = inject(FormBuilder);

  // Muda o para o valor iniial quando da reset
  // evita null
  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.required]
  });

  protected executar() {
    // console.log(this.form);
    console.log(this.form.invalid);

    if (!this.form.invalid){
      console.log(this.form.value);
    }

    this.form.reset();

    // setValue -> altera todos os atributos
    this.form.setValue({
      nome: "ana",
      email: "abc@cba.com"
    });

    // patchValue -> altera alguns atributos apenas
    this.form.patchValue({
      nome: "joão"
    });
  }
}
