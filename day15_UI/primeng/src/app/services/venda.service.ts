import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private baseUrl = environment.api;
  private http = inject(HttpClient);

  public getAll() {
    return this.http.get<Venda[]>(`${this.baseUrl}/vendas`);
  }
}
