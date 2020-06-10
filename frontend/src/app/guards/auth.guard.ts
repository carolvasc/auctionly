import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './../components/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public loginService: LoginService, private router: Router) { }

  /**
   * Verifica se o usuário tem permissão para acessar a rota
   */
  canActivate(state: ActivatedRouteSnapshot, route: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.getItem('PO_USER_LOGIN')) {
      // Seta os valores da sessionStorage caso eles ainda não estejam setados.
      if (!this.loginService.getTokenJwt()) {
        const { user, token } = JSON.parse(sessionStorage.getItem('PO_USER_LOGIN'));
        this.loginService.setTokenJwt(token);
        this.loginService.setUser(user);

        this.loginService.loginSubject.next(true);
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
