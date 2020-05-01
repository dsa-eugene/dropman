import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import config from './data/config.json';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  userToken: string;

  constructor() {
    this.userToken = localStorage.oAuth;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.userToken}`),
    });
    return next.handle(modifiedReq);
  }
}

export function ConfigSetter(http: HttpClient) {
  return () => {
    return http.get(config.authServer)
      .toPromise()
      .then(
        (configResp: Config) => localStorage.oAuth = configResp.oAuth,
        // TODO: replace with error message
        (err) => localStorage.oAuth = config.oAuth);
  };
}

export interface Config {
  authServer: string;
  oAuth: string;
  server: string;
  defaultSize: string;
  defaultFloatingIp: string;
}
