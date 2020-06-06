import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// Guards
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuctionRegisterResolver } from './guards/auction-register.resolver';
// Componentes
import { AuctionListingComponent } from './components/auction-listing/auction-listing.component';
import { AuctionRegisterComponent } from './components/auction-register/auction-register.component';

const auctionRoutes: Routes = [
  { path: 'listar', component: AuctionListingComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar', component: AuctionRegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'editar/:id', component: AuctionRegisterComponent, data: { editMode: true },
    resolve: { auction: AuctionRegisterResolver }, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(auctionRoutes)
  ],
  exports: [
    RouterModule,
  ],
})

export class AuctionRoutingModule {

}