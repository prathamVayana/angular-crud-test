import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { Post } from '../../models/posts';

@Component({
  selector: 'app-create-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent {
    private postsService = inject(PostsService);
    postForm = new FormGroup({
      title : new FormControl<string|null>(''),
      post:new FormControl<string>(''),
      tags: new FormControl<string[]>([])
    })

    availableTags=["crime","suspense","mystery","comedy"]

    onTagChange(tag: string, event:Event) {
      const tagsControl = this.postForm.get('tags') as FormControl<string[]>;
      const currentTags = tagsControl.value || [];
      let isChecked:boolean = (event.target as HTMLInputElement).checked
      if (isChecked) {
        tagsControl.setValue([...currentTags, tag]);
      } else {
        tagsControl.setValue(currentTags.filter(t => t !== tag));
      }
    }

    createPost(event:Event){
      event.preventDefault();

       const formValue = this.postForm.value;

    const post: Post = {
      id: Math.random(),
      title: formValue.title!,
      body: formValue.post!,
      tags: formValue.tags!,
      userId:131,
    };

    const post$ = this.postsService.createPost(post).pipe(
      catchError(err => {
        console.error(err);
        return of({
          id: -1,
          title: 'Error',
          body: '',
          tags: [],
          userId:131
        });
      })
    );

    post$.subscribe({
      next: result => console.log('Post created:', result),
      error: err => console.error('Failed to create post:', err)
    });

      this.postForm.reset({
        title:"",
        post:"",
        tags:[]
      })
    }
}
