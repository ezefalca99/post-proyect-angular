import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokensService } from './core/tokens.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: TokensService){

  }

  canActivate(): boolean {
    if (!this.authService.logIn()){
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
