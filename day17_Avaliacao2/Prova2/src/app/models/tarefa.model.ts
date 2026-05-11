export interface TarefaModel {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'Baixa' | 'Média' | 'Alta';
  data: string;
}
