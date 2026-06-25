import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ServiceOrder } from '../models/ServiceOrder.model';
import { ServiceModel } from '../models/ServiceModel.model';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OsService {
  private http = inject(HttpClient);
  private baseUrl = environment.api;

  // Forma de proteger os dados, usada em casos reais
  private _osList = signal<ServiceOrder[]>([]);
  public osList = computed(() => this._osList());

  // Forma que o Cesar geralmente usaria
  // public osList = signal<OrdemServico[]>([]);

  private _servicosCatalogo = signal<ServiceModel[]>([]);
  public servicosCatalogo = computed(() => this._servicosCatalogo());

  public getOrders() {
    this.http
      .get<ServiceOrder[]>(`${this.baseUrl}/service/`)
      .pipe(take(1))
      .subscribe({
        next: (dados) => this._osList.set(dados),
        error: (erro) => console.error('Falha ao buscar OS', erro),
      });
  }

  public getServices() {
    // Aponta para o ServiceController.java
    this.http
      .get<ServiceModel[]>(`${this.baseUrl}/services/`)
      .pipe(take(1))
      .subscribe({
        next: (dados) => this._servicosCatalogo.set(dados),
      });
  }

  public createOs(novaOS: any) {
    return this.http.post(`${this.baseUrl}/service/`, novaOS).pipe(take(1));
  }

  public updateStatus(id: number, novoStatus: string) {
    return this.http
      .put(`${this.baseUrl}/service/${id}/status`, { status: novoStatus })
      .pipe(take(1));
  }
}
