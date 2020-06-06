import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AuctionComponent } from './modules/auction/containers/auction.component';
import { AuctionListingComponent } from './modules/auction/components/auction-listing/auction-listing.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    AuctionListingComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
