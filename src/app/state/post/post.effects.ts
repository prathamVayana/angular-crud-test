// state/post.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { deletePost, deletePostFailure, deletePostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess } from './post.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {

  actions$= inject(Actions)
  postsService$=inject(PostsService)

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.postsService$.getPosts().pipe(
          map((posts) => loadPostsSuccess({posts:posts?.posts ?? []})),
          catchError((err)=>{
            return  of(loadPostsFailure({error:err.message || 'failed to load posts'}))
          })
        )
      )
    )
  );
  

  deletePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap(({id}) =>
        this.postsService$.deletePost(id).pipe(
          map((posts) => deletePostSuccess({postId:id})),
          catchError((err)=>{
            return  of(deletePostFailure({error:err.message || 'failed to load posts'}))
          })
        )
      )
    )
  );

  deletePostLogger$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(deletePostSuccess),
      tap((action) => {
        console.log(`Post with ID ${action.postId} deleted successfully.`);
      })
    ),
  { dispatch: false } 
  );
}
