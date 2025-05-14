import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Post } from '../../models/posts';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
    @Input() post:Post
    @Output() handleDeletePost = new EventEmitter()

    constructor(){
      this.post={
        id:0,
        title:"",
        body:"",
        tags:[],
        views:0,
        userId:0,
        reactions:{
          likes:0,
          dislikes:0
        }
      }
    }

    delete(){
      this.handleDeletePost.emit()
    }
    
}
