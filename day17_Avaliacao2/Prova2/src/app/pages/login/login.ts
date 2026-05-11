import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected userService = inject(UserService);
  protected router = inject(Router);

  protected login() {
    this.userService.login();
    this.router.navigate(['/']);
  }
}
