import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.auth.getUser();
    const uid = user ? user.uid : 'test';
    request = request.clone({
      url: `http://localhost:3000/${request.url}`,
      setHeaders: {
        Authorization: `Bearer ${uid}`,
      }
    });
    console.log(request);
    return next.handle(request);
  }
}
