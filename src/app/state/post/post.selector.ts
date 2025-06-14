import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state.posts
);

export const selectPostLoading = createSelector(
  selectPostState,
  (state) => state.loading
);

export const selectPostError = createSelector(
  selectPostState,
  (state) => state.error
);