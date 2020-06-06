import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuctionListingComponent } from './components/auction-listing/auction-listing.component';

const auctionRoutes: Routes = [
  { path: 'consulta', component: AuctionListingComponent, canActivate: [] },
  // { path: 'editar/:id', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'cadastrar', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(auctionRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class AuctionRoutingModule {

}