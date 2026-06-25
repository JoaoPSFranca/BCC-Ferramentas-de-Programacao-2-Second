import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  protected form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected entrar() {
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/os-list']);
        },
        error: () => alert('Acesso Negado! Verifique credenciais.'),
      });
    }
  }
}
