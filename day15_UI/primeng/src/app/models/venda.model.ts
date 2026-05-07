import { ItemVenda } from './item-venda.model';

export interface Venda {
  id: number,
  data: string,
  cliente: string,
  itens: ItemVenda[]
}
