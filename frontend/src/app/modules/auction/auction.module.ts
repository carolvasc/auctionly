import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionService } from './auction.service';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionRegisterComponent } from './components/auction-register/auction-register.component';
// PO UI Components
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { AuctionRegisterResolver } from './guards/auction-register.resolver';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { PoWidgetModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
// Interceptor
import { RequestInterceptor } from '../../interceptors/request-interceptor';
import { AuctionListingComponent } from './components/auction-listing/auction-listing.component';

@NgModule({
  imports: [
    CommonModule,
    PoButtonModule,
    PoDynamicModule,
    PoFieldModule,
    PoInfoModule,
    AuctionRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PoWidgetModule,
    PoModalModule,
  ],
  declarations: [
    AuctionRegisterComponent,
    AuctionListingComponent,
  ],
  providers: [
    AuctionService,
    AuctionRegisterResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ]
})
export class AuctionModule { }
