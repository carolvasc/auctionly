import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Cadastrar leilão', link: '/leilao/cadastrar' },
    { label: 'Leilões', link: '/leilao/listar' },
    { label: 'Sobre', link: '/#' },
  ];

  constructor(
    public loginService: LoginService,
  ) { }

}
