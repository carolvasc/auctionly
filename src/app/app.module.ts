import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, appConfig } from './app.config';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import ptBr from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './components/login/guards/login.guard';

// POUI Modules
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuctionListingComponent } from './modules/auction/components/auction-listing/auction-listing.component';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuctionListingComponent,
  ],
  imports: [
    BrowserModule,
    PoModule,
    PoPageLoginModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [
    LoginGuard,
    AuthGuard,
    {
      provide: APP_CONFIG,
      useValue: appConfig
    },
    {
      provide: LOCALE_ID,
      useValue: "pt"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
