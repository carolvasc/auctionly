import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './components/login/guards/login.guard';
// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'leilao', loadChildren: () => import('./modules/auction/auction.module').then(m => m.AuctionModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }