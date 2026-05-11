import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { TarefaModel } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tarefas',
  imports: [ReactiveFormsModule, ListboxModule, ButtonModule, TableModule, DatePipe],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.scss',
})
export class Tarefas {
  protected tarefaService = inject(TarefaService);

  protected fb = inject(NonNullableFormBuilder);
  protected form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', Validators.required],
    prioridade: ['', Validators.required],
    data: ['', Validators.required],
  });

  protected prioridades: string[] = ['Baixa', 'Média', 'Alta'];
  protected selectedPrioridade!: string;

  protected tarefas!: TarefaModel[];

  constructor() {
    this.tarefaService.getAll().subscribe((tarefas) => {
      this.tarefas = tarefas;
    });
  }

  public createTarefa() {
    if (!this.form.invalid) {
      console.log('ta valido');

      const { titulo, descricao, prioridade, data } = this.form.getRawValue();

      this.tarefaService.saveTarefa(titulo, descricao, prioridade, data).subscribe((tarefas) => {
        this.tarefas = tarefas;
      });
    } else {
      console.log('nao ta valido');
      const { titulo, descricao, prioridade, data } = this.form.getRawValue();
      console.log('Titulo: ', titulo);
      console.log('descricao: ', descricao);
      console.log('prioridade: ', prioridade);
      console.log('data', data);
    }
  }

  public getTarefas() {
    this.tarefaService.getAll().subscribe((tarefas) => {
      this.tarefas = tarefas;
    });
  }

  public deleteTarefa(id: number) {
    this.tarefaService.deleteTarefa(id).subscribe((tarefas) => {
      this.tarefas = tarefas;
    });
  }
}
