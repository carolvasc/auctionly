import { Injectable, Inject } from '@angular/core';
import { User } from '../../classes/User';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private poNotification: PoNotificationService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  user: User;
  authenticated: boolean = true;
  userSubject = new Subject();
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
        this.user = response.data.user;
        this.router.navigate(['home']);
        this.authenticated = true;
        this.userAuthenticating.next(false);
      })
      .catch((e) => {
        this.authenticated = false;
        this.userAuthenticating.next(false);

        this.poNotification.error(e.error);
      });
  }

  /**
   * Chama a rota de autenticação do usuário passando login e senha
   * 
   * @param user User informações de autenticação do usuário (login e senha)
   */
  private authUser(user: User): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/auth/authenticate`, user);
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
  isAuthenticated(): Promise<boolean> {
    // let token = this.getJwtToken();

    // if (token !== null) {
    //   this.authenticated = true;
    // } else {
    //   this.authenticated = false;
    // }

    // return false;
    let token = this.getJwtToken();

    if (token !== null) {
      const objToken: Object = { token };

      return this.authUser(objToken).toPromise()
        .then((response) => {
          if (response.data.token) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            token = this.getJwtToken();
            this.user = response.data.user;

            return this.authenticated = true;
          } else {
            return this.authenticated = false;
          }
        }).catch((e) => {
          return new Promise(
            (resolve, reject) => {
              if (this.getJwtToken() !== null) {
                localStorage.removeItem('token');
              }

              this.authenticated = false;
              this.router.navigate(['/login']);

              this.poNotification.error(e.error);

              resolve();
            });
        });
    } else {
      return new Promise(
        (resolve, reject) => {
          if (this.getJwtToken() !== null) {
            localStorage.removeItem('token');
          }

          this.authenticated = false;

          resolve();
        });
    }
  }

  /**
   * Retorna o token
   */
  getJwtToken() {
    return localStorage.getItem('token');
  }
}
