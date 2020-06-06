import { Component, OnInit } from '@angular/core';
import { Auction } from 'src/app/classes/Auction';

@Component({
  selector: 'app-auction-listing',
  templateUrl: './auction-listing.component.html',
  styleUrls: ['./auction-listing.component.css']
})
export class AuctionListingComponent implements OnInit {

  auctions: Auction[] = [
    { name: 'Leilão 1', initialValue: 1250, itemUsed: true, user: { name: 'Carol' }, endDate: { date: '05-12-2019' } },
    { name: 'Leilão 2', initialValue: 300, itemUsed: true, user: { name: 'Carol' }, endDate: { date: '05-12-2019' } },
    { name: 'Leilão 3', initialValue: 1900, itemUsed: false, user: { name: 'Carol' } },
    { name: 'Leilão 4', initialValue: 1250, itemUsed: false, user: { name: 'Carol' }, endDate: { date: '05-12-2019' } },
    { name: 'Leilão 5', initialValue: 120, itemUsed: true, user: { name: 'Carol' }, endDate: { date: '05-12-2019' } },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
