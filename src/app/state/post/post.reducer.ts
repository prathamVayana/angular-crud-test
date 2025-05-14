import { createReducer, on } from '@ngrx/store';
import { loadPostsFailure, loadPostsSuccess } from './post.actions';
import { Post } from '../../models/posts';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

 