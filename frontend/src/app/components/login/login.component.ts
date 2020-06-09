import { Component, OnInit, Inject } from '@angular/core';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordPlaceholder: 'Insira sua senha de acesso'
  };
  
  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }
  
  authUrl = `${this.config.apiUrl}/auth/authenticate`;

  ngOnInit(): void {
  }
}
