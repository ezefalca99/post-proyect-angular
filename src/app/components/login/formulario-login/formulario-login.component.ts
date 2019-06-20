import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import { TokensService } from 'src/app/core/tokens.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  loginForm: FormGroup;
  formTouched: boolean = false;
  message: string;

  constructor(private tokensService: TokensService ,private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public login(form){
    if (form.valid){
    
      this.tokensService.login(form.value.usernameOrEmail, form.value.password).subscribe(
        () => this.router.navigate(['']),
        error => this.message = "Credenciales equivocadas"
      );
    }
    this.formTouched = true;
  }

}
