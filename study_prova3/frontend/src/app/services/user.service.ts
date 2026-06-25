import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private api = environment.api;

  public login(form: Partial<{login: string, password: string}>) {
    return this.http
      .post<{ token: string }>(`${this.api}/auth/login`, form)
      .pipe(take(1));
  }
}
