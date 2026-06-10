import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { Coment } from '../models/coment.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private  http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  public obterPosts() {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  } 

  public obterComents(id: string | null) {
    return this.http.get<Coment[]>(`${this.baseUrl}/posts/${id}/comments`);
  }
}
