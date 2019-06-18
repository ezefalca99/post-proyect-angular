import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  public getUserProfile(id: number){
    return this.http.get("users/" + id);
  }
}
