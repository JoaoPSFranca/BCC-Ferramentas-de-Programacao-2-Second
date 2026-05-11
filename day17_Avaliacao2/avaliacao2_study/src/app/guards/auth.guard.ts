import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : MaybeAsync<GuardResult> {
    if (this.userService.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
