import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

// npx json-server db.json -m ./node_modules/json-server-auth

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected http = inject(HttpClient);
  protected api = environment.api;
  protected token: string = '';

  constructor() { }

  public async login(email: string, password: string) {
    // const user = ;

    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.api}/login`, { email, password })
      );

      console.log('Response: ', response);
      if (response) {
        this.token = response.accessToken;
      }
      return true;
    } catch (err) {
      console.error('Error: ', err);
      return false;
    }
  }

  public isLogged() {
    return !!this.token;
  }

  public getToken() {
    return this.token;
  }
}
