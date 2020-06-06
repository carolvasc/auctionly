import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuctionService } from '../auction.service';

@Injectable()
export class AuctionRegisterResolver implements Resolve<any>{

  constructor(public auctionService: AuctionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let id = route.params['id'];

    return this.auctionService.getAuction(id);
  }
}