import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';
import {Role} from './role.model';

@Injectable()
export class TokensService {
  static END_POINT = 'auth/signin';

  constructor(private httpService: HttpService) {
  }

  login(usernameOrPassword: string, password: string): Observable<any> {
    return this.httpService.successful("Logueado correctamente!").login(usernameOrPassword, password, TokensService.END_POINT);
  }

  logout(): void {
    this.httpService.logout();
  }

  isAdmin(): boolean {
    return this.httpService.getToken() ? this.httpService.getToken().roles.includes(Role.ROLE_ADMIN) : false;
  }


  getUsername(): string {
    return this.httpService.getToken() ? this.httpService.getToken().user : undefined;
  }

  getName(): string {
    return this.httpService.getToken() ? this.httpService.getToken().name : '???';
  }
}
