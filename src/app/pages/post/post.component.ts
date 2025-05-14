import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts';
import { CardComponent } from '../../components/card/card.component';
import { catchError, combineLatest, filter, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { deletePost, loadPosts } from '../../state/post/post.actions';
import { AppState } from '../../state/app.state';
import {
  selectAllPosts,
  selectPostError,
  selectPostLoading,
} from '../../state/post/post.selector';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardComponent, AsyncPipe, LoadingComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  store = inject(Store<AppState>);
  posts$: Observable<Post[]> = this.store.select(selectAllPosts);
  loading$ = this.store.select(selectPostLoading);
  error$ = this.store.select(selectPostError);

  viewModel$: Observable<{
    posts: Post[];
    loading: boolean;
    error: string | null;
  }> = combineLatest([this.posts$, this.loading$, this.error$]).pipe(
    map(([posts, loading, error]) => ({ posts, loading, error }))
  );

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  deletePost(id:number){
    this.store.dispatch(deletePost({id}))
  }
}
