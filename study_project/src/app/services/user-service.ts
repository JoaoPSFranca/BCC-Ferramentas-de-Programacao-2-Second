import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private api = environment.api;
  private token: string | null = null;

  constructor() { }

  public login(user: Partial<{email: string, password: string}>) {
    let log = false;
    this.http.post<string>(`${this.api}/login`, user).subscribe({
      next: (res) => this.token = res,
      error: (err) => {
        console.log('Erro no login: ', err);
        this.token = null;
      }
    });

    return this.token != null;
  }

  public isLogged() {
    return this.token != null;
  }
}
