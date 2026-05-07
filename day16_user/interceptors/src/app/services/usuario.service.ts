import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.api;
  private http = inject(HttpClient);
  protected token: string = '';

  public getToken() {
    return this.token;
  }

  // private getHeaders() {
  //   return new HttpHeaders()
  //     .set('Autorization', `Bearer ${this.token}`)
  //     .set ('Content-Type', 'application/json');
  // }

  public obterTodos() {
    return this.http.get<any>(`${this.baseUrl}/users`);
    // return this.http.get<any>(`${this.baseUrl}/users`, {headers: this.getHeaders()});
  }

  public async login(email: string, senha: string) {
    const usuario = {
      email,
      senha,
    };

    // this.http.post<any>(`${this.baseUrl}/login`, usuario).subscribe({
    //   next: (token) => {
    //     console.log(token);
    //     this.token = token;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })

    try {
      const resposta = await firstValueFrom(this.http.post<any>(`${this.baseUrl}/login`, usuario));
      if (resposta) {
        console.log(resposta);
        this.token = resposta.token;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
