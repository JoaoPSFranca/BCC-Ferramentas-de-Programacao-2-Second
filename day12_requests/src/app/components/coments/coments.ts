import { Component, inject, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { Api } from '../../services/api';
import { ActivatedRoute } from '@angular/router';
import { Coment } from '../../models/coment.model';

@Component({
  selector: 'app-coments',
  imports: [],
  templateUrl: './coments.html',
  styleUrl: './coments.css',
})
export class Coments {
  protected coments =  signal<Coment[]>([]);
  private api = inject(Api);
  private route = inject(ActivatedRoute);

  constructor() {
    let id = this.route.snapshot.paramMap.get('id');

    this.api.obterComents(id).subscribe({
      // deu certo
      next: (coments) => {
        console.log(coments);
        this.coments.set(coments);
      },
      // deu errado
      error: (err) => {
        console.error(err);
      },
    });
  }

  protected NavigateBack() {
    window.history.back();
  }
}
