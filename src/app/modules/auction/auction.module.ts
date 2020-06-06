import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionService } from './auction.service';
import { AuctionRegisterComponent } from './components/auction-register/auction-register.component';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    PoButtonModule,
    PoDynamicModule,
    AuctionRoutingModule,
  ],
  declarations: [
    AuctionRegisterComponent
  ],
  providers: [
    AuctionService,
  ]
})
export class AuctionModule { }
