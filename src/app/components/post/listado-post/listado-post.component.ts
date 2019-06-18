import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/models/post.model';


@Component({
  selector: 'app-listado-post',
  templateUrl: './listado-post.component.html',
  styleUrls: ['./listado-post.component.css']
})
export class ListadoPostComponent implements OnInit {
  
  posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        posts.sort((a,b)=> b.id - a.id);    
        this.posts = posts;
      }
    );
  }

}
