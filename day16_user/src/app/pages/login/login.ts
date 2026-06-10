import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected userService = inject(UsuarioService);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);

  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {}

  protected async login() {
    const resposta = await this.userService.login('user1@email.com', 'user1');
    if (resposta) {
      await this.router.navigate(['users']);
    } else {
      console.error('Login e/ou Senha inválido(s)');
    }
  }
}
