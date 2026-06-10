import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private logged = false;

  constructor() {}

  public login(user: Partial<{ email: string | null; password: string | null }>) {
    return this.http.post(`${environment.api}/login`, user);
  }

  public loginOn() {
    this.logged = true;
  }

  public isLogged() {
    return this.logged;
  }
}
