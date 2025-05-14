import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/posts';


export const loadPosts = createAction('[Posts] Load Posts');
export const deletePost = createAction(
  '[posts] Delete Post',
  props<{id:number}>()
)

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);

export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{ postId: Number }>()
);

export const deletePostFailure = createAction(
  '[Posts] Delete Post Failure',
  props<{ error: string }>()
);
