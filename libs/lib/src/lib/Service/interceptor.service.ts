import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const isAPIURL = request.url.startsWith('http://localhost:8008/');
    if(token && isAPIURL) {
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`,
        }
      })
    }
    return next.handle(request);
  }
}