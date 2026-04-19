import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private userService = inject(UserService);
  private router = inject(Router);

  protected fb = inject(NonNullableFormBuilder);
  protected form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected login() {
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          this.userService.loginOn();
          this.router.navigate(['/vendas']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
        }
      });
    }
  }
}
