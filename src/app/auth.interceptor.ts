import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, NEVER } from 'rxjs';
import { retry } from 'rxjs/operators';
import config from './data/config.json';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private apiService: ApiService
  ) { }
  
  userToken: string;
  setToken = false; //should do this a better way

  public getUserToken() {
    this.apiService.getUserToken().subscribe((data: any) => {
      console.log(data);
      this.userToken = data.oAuth;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.userToken);
    if (!this.userToken) {
      if (!this.setToken) {
        this.setToken = true;
        this.getUserToken();
        return NEVER; //as it is this doesnt actually ever get re-tried 
      }
      if (request.url === config.authServer) {
        return next.handle(request);
      }
      return NEVER;
    }
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.userToken}`),
    });
    return next.handle(modifiedReq);
  }
}
