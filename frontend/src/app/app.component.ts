import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { LoginService } from './components/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMenu: boolean = false;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home', icon: 'po-icon-home' },
    { label: 'Cadastrar leilão', link: '/leilao/cadastrar', icon: 'po-icon-document-filled' },
    { label: 'Leilões', link: '/leilao/listar', icon: 'po-icon-list' },
    { label: 'Logout', icon: 'po-icon-exit', action: this.logout.bind(this) },
  ];

  constructor(
    public loginService: LoginService,
  ) {
    // Não mostra o menu na tela de login
    this.loginService.loginSubject.subscribe(() => {
      if (sessionStorage.getItem('PO_USER_LOGIN')) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

}
