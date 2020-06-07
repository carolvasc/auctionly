import { Component, OnInit } from '@angular/core';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';

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

  constructor() { }

  ngOnInit(): void {
    // this.loadinSubscription = this.loginService.userAuthenticating.subscribe(res => {
    //   this.loading = res;
    // })
  }

  submit(here) {
    console.log(here);
  }

}
