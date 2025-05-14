import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { Post } from '../../models/posts';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { createPost } from '../../state/post/post.actions';

@Component({
  selector: 'app-create-posts',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css',
})
export class CreatePostsComponent {
  private store = inject(Store<AppState>);
  private postsService = inject(PostsService);

  readonly availableTags = ['crime', 'suspense', 'mystery', 'comedy'];

  readonly postForm = this.createPostForm();

   private createPostForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required,Validators.maxLength(50)]  }), // instead of this.postForm.value.title! where ! means can not be null this nonNullable method is way more intuitive.
      post: new FormControl('', { nonNullable: true, validators: Validators.required }),
      tags: new FormControl<string[]>([], { nonNullable: true }),
    });
  }

  onTagChange(tag: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleTag(tag, isChecked);
  }

  private toggleTag(tag: string, checked: boolean): void {
    const tagsControl = this.postForm.get('tags') as FormControl<string[]>;
    const currentTags = tagsControl.value ?? [];

    const updatedTags = checked
      ? [...currentTags, tag]
      : currentTags.filter(t => t !== tag);

    tagsControl.setValue(updatedTags);
  }

  private mapFormToPost(): Post {
    const { title, post, tags } = this.postForm.value;
    return {
      id: Math.floor(Math.random()*1000),
      title,
      body: post,
      tags,
      userId: 131, 
    };
  }

  createPost(event: Event): void {
    event.preventDefault();

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      alert("invalid information")
      return;
    }

    const post = this.mapFormToPost();

    this.store.dispatch(createPost({post})) 

    // this.postsService.createPost(newPost).subscribe({
    //   next: (result) => console.log('Post created:', result),
    //   error: (err) => {
    //     console.error('Failed to create post:', err);
    //     return of(err);
    //   },
    // });

    this.postForm.reset({
      title: '',
      post: '',
      tags: [],
    });
  }
}
