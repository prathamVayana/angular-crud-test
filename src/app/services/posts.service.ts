import { Injectable } from '@angular/core';
import { Post } from '../models/posts';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { PostsResponse } from '../models/apiModels/posts';


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

  createPost(post:Post): Observable<Post>{
    return this.http.post<Post>(`${this.apiUrl}/add`,post).pipe(
      catchError(err=>{
        console.log(err)
        return throwError(()=>new Error("failed to create post!"))
      })
    )
  }

  deletePost(id:number): Observable<Post>{
    return this.http.delete<Post>(`${this.apiUrl}/${id}`).pipe(
      catchError(err=>{
        console.log(err)
        return throwError(()=>new Error("failed to delete post!"))
      })
    )
  }

}
