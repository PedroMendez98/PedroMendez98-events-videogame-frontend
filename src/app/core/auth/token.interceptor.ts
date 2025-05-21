import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Si no hay token, sigue la request original
    if (!token) {
      return next.handle(req);
    }

    console.log('Token añadido a la petición:', token);

    // Si hay token, clona la request y le agrega el header Authorization
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    console.log('Petición final con headers:', cloned);

    return next.handle(cloned);
  }
}
