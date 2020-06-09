import { LoginService } from '../components/login/login.service'
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private poNotification: PoNotificationService,
  ) { }

  /**
   * Inclui o Token JWT em todas as requisições.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.loginService.getTokenJwt();
    let authReq = req;

    if (token !== null) {
      authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((e: HttpErrorResponse) => {
        this.poNotification.error(e.error.error);

        if (e.error.error === 'Token inválido.') {
          this.loginService.logout();
        }
        return throwError(e);
      })
    );
  }
}