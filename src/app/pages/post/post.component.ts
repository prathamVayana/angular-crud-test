import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts';
import { CardComponent } from '../../components/card/card.component';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../state/post/post.actions';
import { AppState } from '../../state/app.state';
import { selectAllPosts } from '../../state/post/post.selector';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  store = inject(Store<AppState>);
  posts$: Observable<Post[]> = this.store.select(selectAllPosts);

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }
}
