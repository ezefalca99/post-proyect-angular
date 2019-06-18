import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService) { }

  public getPosts() {
    return this.http.get("posts");
  }

  public savePost(post: Post){
    return this.http.post("posts", post);
  }

}
