import { Injectable } from '@angular/core';
import { User } from '../../classes/User';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  user: User;
  token: string = null;
  authenticated: boolean = true;

  loginSubject: Subject<boolean> = new Subject();

  /**
   * Realiza o logout do usuário e limpa o sessionStorage.
   */
  logout() {
    if (this.token !== null) {
      sessionStorage.removeItem('PO_USER_LOGIN');
    }

    this.user = null;
    this.token = null;

    this.loginSubject.next(false);

    this.router.navigate(['/login']);
  }

  /**
   * Retorna o valor do token.
   */
  getTokenJwt() {
    return this.token;
  }

  /**
   * Seta o valor do token.
   * @param token 
   */
  setTokenJwt(token: string) {
    this.token = token;
  }

  /**
   * Retorna o usuário.
   */
  getUser() {
    return this.user;
  }

  /**
   * Seta o valor do usuário.
   * @param user 
   */
  setUser(user) {
    this.user = user;
  }

}
