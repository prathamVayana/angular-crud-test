import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts';
import { CardComponent } from '../../components/card/card.component';
import { catchError, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone:true,
  imports: [CardComponent,AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent {
  // posts:Post[]=[]
  // constructor(private postService:PostsService){}

  posts$ : Observable<Post[]> = inject(PostsService).getPosts().pipe(
    map(res=>res.posts),
    catchError(err => {
      console.log(err)
      // return []; here we must not do it because our posts is of type Observable<Post[]> not Post[] 
      // so if we return [] empty array then it will result in an error because we wont be able to async it in html.
      // of([]) actually returns a Observable that emits empty array
      return of([]);
    })
  )

  // ngOnInit(){
    // this.postService.getPosts().subscribe({
    //   next:(res)=> {
    //     this.posts=res.posts
    //     console.log(this.posts)
    //   },
    //   error: (err)=> console.log(err)
    // })
  // }
}
