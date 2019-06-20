import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokensService } from 'src/app/core/tokens.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  formTouched: boolean = false;
  isLoading: boolean = false;
  message: string;

  constructor(private http: HttpService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  public signup(form) {
    this.formTouched = true;
    console.log(this.isLoading);

    if (form.valid && !this.isLoading) {
      
      this.isLoading = true;

      this.http.post("auth/signup",{name: form.value.name, username: form.value.username, email: form.value.email, password: form.value.password})
      .subscribe(
      res => {
        this.message = res.message;
        this.signupForm.reset();
        this.formTouched = false;
        this.isLoading = false;
        
      },
      error => {
        this.message = error.message;
        this.isLoading = false;
      });   
    }
    
  }
}
