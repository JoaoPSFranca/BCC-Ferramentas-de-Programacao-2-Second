import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { getXHRResponse } from 'rxjs/internal/ajax/getXHRResponse';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected userService = inject(UsuarioService);

  constructor() {
    this.login();
  }

  protected async login() {
    const resposta = await this.userService.login('user1@email.com', 'user1');
    if (resposta) {
      // faz algo

      this.userService.obterTodos().subscribe({
        next: (usuarios) => {
          console.log(usuarios);
        }
      });

    } else {
      console.error('Login e/ou Senha inválido(s)');
    }
  }
}
