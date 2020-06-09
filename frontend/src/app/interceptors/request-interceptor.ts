import { LoginService } from '../components/login/login.service'
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoadingRequestService } from '../shared/loading-request.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{

  constructor(public loginService: LoginService, public loadingRequestService: LoadingRequestService, private poNotification: PoNotificationService,){}

  /**
   * Funções deste intercept
   * - Incluir no header de cada requisição o Token JWT
   * - Controlar o serviço de loading
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const token = this.loginService.getJwtToken();
    const token = ''
    let authReq = req;
    this.loadingRequestService.onRequestStarted();

    if(token !== null){
      authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }
    
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingRequestService.onRequestFinished();
        }
        return event;
      }),
      catchError((e: HttpErrorResponse) => {
        this.poNotification.error(e.error.error);
        if (e.error.error === 'Token inválido.') {
          // Função que faz o logout
        }
        this.loadingRequestService.onRequestFinished();
        return throwError(e);
      })
    );
  }
}