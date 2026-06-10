import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
  });

  private router = inject(Router);
  private userService = inject(UserService);

  protected login() {
    if (this.userService.login(this.form.value)){
      console.log("Login bem-sucedido!");
      this.router.navigate(['/list']);
    } else {
      console.log("Falha no login. Verifique suas credenciais.");
    }
  }
}
