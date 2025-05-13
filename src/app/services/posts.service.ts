import { Injectable } from '@angular/core';
import { Post } from '../models/posts';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';


interface PostsResponse{
  posts:Post[]
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly apiUrl = 'https://dummyjson.com/posts';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch posts', error);
        return throwError(() => new Error('Failed to fetch posts'));
      })
    );
  }

}
