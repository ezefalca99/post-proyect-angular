import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-post',
  templateUrl: './formulario-post.component.html',
  styleUrls: ['./formulario-post.component.css']
})
export class FormularioPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
   }

  ngOnInit() {
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10) ,Validators.maxLength(240)]]
    });
  }

  savePost(postForm){
    if(postForm.valid){
      this.postService.savePost({ description: postForm.value.description }).subscribe(x => console.log(x));
      this.postForm.value.description = '';
      this.redirectTo(this.router.url);
    }
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
