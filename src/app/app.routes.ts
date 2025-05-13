import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"posts",loadComponent:()=>import("./pages/post/post.component").then((c)=>c.PostComponent)},
    {path:"create-post",loadComponent:()=>import("./pages/create-posts/create-posts.component").then((c)=>c.CreatePostsComponent)},
    {path:"**",component:NotFoundComponent}
];
