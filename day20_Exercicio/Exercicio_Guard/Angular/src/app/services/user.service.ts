import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private token = '';

  constructor() {}

  public login(user: Partial<User>) {
    return this.http.post<{ token: string }>(`${environment.api}/login`, user);
  }

  public loginOn(token: string) {
    this.token = token;
  }

  public isLogged() {
    return this.token != null && this.token != '';
  }

  public getToken (){
    return this.token;
  }
}
