import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Venda } from '../model/venda.model';

@Injectable({
  providedIn: 'root',
})
export class VendasService {

  private url = `${environment.api}/vendas`;
  private http = inject(HttpClient);

  public obterTodas() {
    return this.http.get<Venda[]>(this.url);
  }

}
