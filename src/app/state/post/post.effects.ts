// state/post.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './post.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
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
}
