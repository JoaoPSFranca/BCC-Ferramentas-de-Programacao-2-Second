import { Component, inject, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { Api } from '../../services/api';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  private api = inject(Api);
  protected posts =  signal<Post[]>([]);

  constructor() {
    this.obterPosts()
  }

  protected obterPosts() {
    this.api.obterPosts().subscribe({
      // deu certo
      next: (posts) => {
        console.log(posts);
        this.posts.set(posts);
      },
      // deu errado
      error: (err) => {
        console.error(err);
      },
    });
  }
}
