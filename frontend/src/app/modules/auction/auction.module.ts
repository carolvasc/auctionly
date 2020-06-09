import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionService } from './auction.service';
import { AuctionRegisterComponent } from './components/auction-register/auction-register.component';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { AuctionRegisterResolver } from './guards/auction-register.resolver';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../interceptors/request-interceptor';

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
  ],
  declarations: [
    AuctionRegisterComponent
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
