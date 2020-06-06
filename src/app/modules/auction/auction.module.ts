import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionService } from './auction.service';

@NgModule({
  imports: [
    CommonModule,
    AuctionRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    AuctionService,
  ]
})
export class AuctionModule { }
