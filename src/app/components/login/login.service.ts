import { Injectable, Inject } from '@angular/core';
import { User } from 'src/app/classes/User';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  user: User;
  authenticated: boolean = true;
  userSubject: Subject<any> = new Subject<any>();
  userAuthenticating: Subject<boolean> = new Subject<boolean>();

  /**
   * Realiza a autenticação do usuário e o preenchimento das informações numa variável pública que fica disponível no serviço.
   * Em caso de erro, lança a mensagem de retorno do banco para o usuário.
   * 
   * @param login string login do usuário
   * @param password string senha do usuário
   */
  login(login: string, password: string) {

    const user = new User();
    user.login = login;
    user.password = password;

    //Indica que o usuário está em processo de autenticação
    this.userAuthenticating.next(true);

    this.authUser(user)
      .toPromise()
      .then((response: any) => {
        localStorage.setItem('token', response.data.token);
        //Preenche os dados do usuário com o token decodificado
        // this.user = this.getUserData(this.decodeToken(response.data.token));
        this.router.navigate(['home']);
        this.authenticated = true;
        this.userAuthenticating.next(false);
      })
      .catch((e) => {
        this.authenticated = false;
        this.userAuthenticating.next(false);
        // this.messageService.add(e.error.message, 'danger');
      });
  }

  /**
   * Chama a rota de autenticação do usuário passando login e senha
   * 
   * @param user User informações de autenticação do usuário (login e senha)
   */
  private authUser(user: User): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/auth`, user);
  }

  /**
   * Realiza o logout do usuário excluindo o token do localstorage e redirecionando para a tela de login
   */
  logout() {
    const token = this.getJwtToken();

    if (token !== null) {
      localStorage.removeItem('token');
    }

    this.authenticated = false;
    this.user = null;
    this.router.navigate(['/login']);
  }

  userHasRole() {
    return true;
  }

  /**
   * Verifica se o usuário está autenticado validando o token.
   * Quando o token é validado com sucesso, ele é renovado.
   */
  isAuthenticated(): boolean {
    let token = this.getJwtToken();

    // if (token !== null) {
    //   const objToken: Object = { token };

    //   return this.validateToken(objToken).toPromise()
    //     .then((response) => {
    //       if (response.data.valid == true) {
    //         localStorage.removeItem('token');
    //         localStorage.setItem('token', response.data.token);
    //         token = this.getJwtToken();
    //         this.user = this.getUserData(this.decodeToken(token));
    //         setTimeout(() => {              
    //           this.userSubject.next(this.user);
    //         }, 10);
    //         return this.authenticated = true;
    //       } else {
    //         return this.authenticated = false;
    //       }
    //     }).catch((error) => {
    //       return new Promise(
    //         (resolve, reject) => {
    //           if(this.getJwtToken() !== null){
    //             localStorage.removeItem('token');
    //           }
    //           this.authenticated = false;
    //           this.router.navigate(['/login']);
    //           resolve();
    //         });
    //     });
    // } else {
    //   return new Promise(
    //     (resolve, reject) => {
    //       if(this.getJwtToken() !== null){
    //         localStorage.removeItem('token');
    //       }
    //       this.authenticated = false;
    //       resolve();
    //     });
    // }

    return false;
  }

  /**
   * Chama a rota de validação do token do usuário
   * 
   * @param token string token JWT
   */
  private validateToken(): Observable<any> {
    return new Observable<any>(obs => obs.next({ user: {}, roles: {} }));
  }

  /**
   * Recupear os dados contidos no token
   * 
   * @param decodedJwt any informações decodificadas do token JWT
   */
  public getUserData(decodedJwt: any) {
    if (decodedJwt) {
      return decodedJwt.data;
    } else {
      return null;
    }
  }

  /**
   * Decodifica o token JWT
   * 
   * @param token string token
   */
  public decodeToken(token: string) {
    return jwtDecode(token);
  }

  /**
   * Retorna o token
   */
  getJwtToken() {
    return localStorage.getItem('token');
  }
}
