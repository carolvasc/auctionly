import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, appConfig } from './app.config';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import ptBr from '@angular/common/locales/pt';

import { RequestInterceptor } from "./interceptors/request-interceptor";

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guards/auth.guard';

// POUI Modules
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuctionListingComponent } from './modules/auction/components/auction-listing/auction-listing.component';

import {SharedModule} from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuctionModule } from './modules/auction/auction.module';

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
    AuctionModule,
    SharedModule,
    RouterModule.forRoot([])
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_CONFIG,
      useValue: appConfig
    },
    {
      provide: LOCALE_ID,
      useValue: "pt"
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
