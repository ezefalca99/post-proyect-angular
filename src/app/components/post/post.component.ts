import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  posts: Post[] = [];
  postForm: FormGroup;
  formTouched = false;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.getPosts();
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]]
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        posts.sort((a, b) => b.id - a.id);
        this.posts = posts;
      }
    );
    
  }

  savePost(postForm) {
    this.formTouched = true;

    if (postForm.valid) {
      this.postService.savePost({ description: postForm.value.description }).subscribe(post => {
        this.getPosts();
        this.postForm.reset(); 
        this.formTouched = false;
      });
           
    }
    
  }
}
