import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/posts';

export const loadPosts = createAction('[Posts] Load Posts');
export const deletePost = createAction(
  '[posts] Delete Post',
  props<{ id: number }>()
);
export const createPost = createAction(
  '[posts] Create Post',
  props<{ post: Post }>()
);

// success actions
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const createPostSuccess = createAction(
  '[Posts] create Post Success',
  props<{ post: Post }>()
);
export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{ postId: Number }>()
);

// failure actions
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);
export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{ error: string }>()
);
export const deletePostFailure = createAction(
  '[Posts] Delete Post Failure',
  props<{ error: string }>()
);
