import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { Token } from './token.model';
import { Error } from './error.model';

@Injectable()
export class HttpService {
  static API_END_POINT = environment.API;
  static UNAUTHORIZED = 401;
  static NOT_FOUND = 404;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private successfulNotification = undefined;
  private printDirectly: boolean;

  loggedIn = false;
  isAdmin = false;
  token: Token = new Token();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
    }
  }

  private decodeToken(token) {
    try {
      this.loggedIn = true;
      this.token = { accessToken: token, user: null, name: null, roles: null };
      this.token.user = new JwtHelperService().decodeToken(this.token.accessToken).user;
      this.token.name = new JwtHelperService().decodeToken(this.token.accessToken).name;
      this.token.roles = new JwtHelperService().decodeToken(this.token.accessToken).roles;
    } catch (error) {
      this.loggedIn = false;
      this.token = { accessToken: null, user: null, name: null, roles: null };
    }

  }

  login(usernameOrEmail: string, password: string, endPoint: string): Observable<any> {

    return this.post(endPoint, { usernameOrEmail: usernameOrEmail, password: password }).pipe(
      map(token => {
        localStorage.setItem("token", token.accessToken);
        this.decodeToken(token.accessToken);

      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    this.loggedIn = false;
    this.isAdmin = false;
    this.token = new Token();
    this.router.navigate(['']);
    
  }

  /*
    public get logIn(): boolean {
      try {  
        return (localStorage.getItem('token') !== null && !new JwtHelperService().isTokenExpired(localStorage.getItem('token')));
  
      } catch (error) {
        return false;
      }
    }
  */


  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value); // This class is immutable
    return this;
  }

  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  pdf(printDirectly = true): HttpService {
    this.printDirectly = printDirectly;
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf , application/json');
    return this;
  }

  post(endpoint: string, body?: Object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: Object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  patch(endpoint: string, body?: Object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value); // This class is immutable
    return this;
  }

  private authBasic(mobile: number, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(mobile + ':' + password));
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    let token = localStorage.getItem("token");
    if (token !== undefined) {
      this.header('Authorization', 'Bearer ' + token);
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        if (this.printDirectly) {
          const iFrame = document.createElement('iframe');
          iFrame.src = URL.createObjectURL(blob);
          iFrame.style.visibility = 'hidden';
          document.body.appendChild(iFrame);
          iFrame.contentWindow.focus();
          iFrame.contentWindow.print();
        } else {
          window.open(window.URL.createObjectURL(blob));
        }
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }


  private handleError(response): any {
    console.log(response);
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.snackBar.open('Unauthorized', 'Error', {
        duration: 2000
      });
      this.logout();
      this.router.navigate(['']);
      return throwError(response.error);
    } else {
      try {
        if (response.status === HttpService.NOT_FOUND) {
          error = { error: 'Not Found', message: '', path: '' };
        } else {
          error = response.error; // with 'text': JSON.parse(response.error);
        }
        this.snackBar.open(error.error + ': ' + error.message, 'Error', {
          duration: 5000
        });
        return throwError(error);
      } catch (e) {
        this.snackBar.open('No server response', 'Error', {
          duration: 5000
        });
        return throwError(response.error);
      }
    }
  }
}
