import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './../components/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public loginService: LoginService, private router: Router) { }

  /**
   * Verifica se o usuário tem permissão para acessar a rota
   * 
   */
  canActivate(state: ActivatedRouteSnapshot, route: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.authenticated) {

      // const autorizatedRoles = state.data.roles;

      // if(autorizatedRoles){
      if (this.loginService.userHasRole()) {
        return true;
      } else {
        this.router.navigate(['/home']);
        // this.messageService.add('Você não possui permissão para acessar esta página', 'danger');
        return false;
      }

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
