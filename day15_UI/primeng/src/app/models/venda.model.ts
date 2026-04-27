import { ItemVenda } from './item-venda.model';

export interface Venda {
  codigo: number,
  data: string,
  cliente: string,
  itens: ItemVenda[]
}
