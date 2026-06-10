import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  protected userService = inject(UsuarioService);

  constructor() {
    this.userService.obterTodos().subscribe({
      next: (usuarios) => {
        console.log(usuarios);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
