import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post, PostsResponse } from '../shared/models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private apiBase = environment.apiBase;

  getPosts(source?: 'thrive' | 'mia', page: number = 1, limit: number = 6): Observable<PostsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if (source) {
      params = params.set('source', source);
    }
    return this.http.get<PostsResponse>(this.apiBase + '/posts', { params });
  }

  getPost(filename: string): Observable<{ filename: string; content: string }> {
    return this.http.get<{ filename: string; content: string }>(`${this.apiBase}/posts/${filename}`);
  }

  publishPost(filename: string): Observable<any> {
    return this.http.post(`${this.apiBase}/posts/${filename}/publish`, {});
  }
}
