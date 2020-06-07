import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Verifica se o usuário já está logado quando a rota solicitada for a tela de login.
   * Quando o usuário estiver logado, ele será redirecionado para Home
   * 
   */
  canActivate(state: ActivatedRouteSnapshot, route: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.authenticated) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}