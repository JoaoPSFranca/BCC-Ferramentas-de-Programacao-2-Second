import { Component, inject } from '@angular/core';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [Password, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected fb = inject(NonNullableFormBuilder);
  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  protected userService = inject(UserService);

  constructor() {}

  protected async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      const response = await this.userService.login(email, password);

      if (response) {
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    }
  }
}
