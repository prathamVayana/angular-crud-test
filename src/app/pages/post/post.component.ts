import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/posts';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-post',
  imports: [CardComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent {
  posts:Post[]=[]
  constructor(private postService:PostsService){}

  ngOnInit(){
    this.postService.getPosts().subscribe({
      next:(res)=> {
        this.posts=res.posts
        console.log(this.posts)
      },
      error: (err)=> console.log(err)
    })
  }
}
