import { Component, inject, signal } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { take } from 'rxjs';
import { VendasTable } from '../../components/vendas-table/vendas-table';
import { Venda } from '../../model/venda.model';

@Component({
  selector: 'app-vendas-list',
  imports: [VendasTable],
  templateUrl: './vendas-list.html',
  styleUrl: './vendas-list.scss',
})
export class VendasList {

  private vendasService = inject(VendasService);

  protected vendas = signal<Venda[]>([]);

  constructor() {
    this.vendasService.obterTodas().pipe(take(1)).subscribe({
      next: (vendas) => {
        console.log(vendas);
        this.vendas.set(vendas);
      }
    })
  }

  protected exibir(venda: Venda) {
    console.log('método do componente pai...', venda);
  }

}
