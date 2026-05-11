import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { TarefaModel } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  protected http = inject(HttpClient);
  protected api = environment.api;
  protected tarefas: TarefaModel[] = [];

  public getAll() {
    return this.http.get<TarefaModel[]>(`${this.api}/tarefas`)
  }

  public saveTarefa(titulo: string, descricao: string, prioridade: string, data: string) {
    const tarefa = { titulo, descricao, prioridade, data };

    this.http.post<any>(`${this.api}/tarefas`, tarefa).subscribe({
      next: (data) => {
        this.tarefas.push(data);
      },
      error: err => {
        console.log(err);
      }
    });

    return this.getAll();
  }

  public deleteTarefa(id: number) {
    this.http.delete<any>(`${this.api}/tarefas/${id}`).subscribe(tarefa => {});
    return this.getAll();
  }
}
