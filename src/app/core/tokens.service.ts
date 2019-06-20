import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';
import {Role} from './role.model';
import { Token } from './token.model';

@Injectable()
export class TokensService {
  static END_POINT = 'auth/signin';

  constructor(private httpService: HttpService) {
  }

  login(usernameOrPassword: string, password: string): Observable<any> {
    return this.httpService.login(usernameOrPassword, password, TokensService.END_POINT);
  }

  logout(): void {
    this.httpService.logout();
  }

  logIn(): boolean {
    return this.httpService.loggedIn;
  }

  isAdmin(): boolean {
    return this.httpService.token ? this.httpService.token.roles.includes(Role.ROLE_ADMIN) : false;
  }

  getUsername(): string {
    return this.httpService.token ? this.httpService.token.user : undefined;
  }

  getName(): string {
    return this.httpService.token ? this.httpService.token.name : '???';
  }

}
