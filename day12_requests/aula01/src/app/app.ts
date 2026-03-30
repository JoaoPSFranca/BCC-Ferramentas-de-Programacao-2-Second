import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private api = inject(Api);
  protected posts: Post[] = [];

  constructor() {
    this.obterPosts()
  }

  protected obterPosts() {
    this.api.obterPosts().subscribe({
      // deu certo
      next: (posts) => {
        console.log(posts);
        this.posts = posts;
      },
      // deu errado
      error: (err) => {
        console.error(err);
      },
    });
  }
}
