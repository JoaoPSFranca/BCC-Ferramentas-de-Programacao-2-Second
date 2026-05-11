import { SubscribeModel} from './subscribe.model';

export interface ActiviteModel {
  codigo: number,
  data: string,
  titulo: string,
  palestrante: string,
  inscritos: SubscribeModel[],
}
