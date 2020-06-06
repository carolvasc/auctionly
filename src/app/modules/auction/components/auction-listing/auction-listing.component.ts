import {
  Component,
  OnInit, OnDestroy
} from '@angular/core';
import { Auction } from 'src/app/classes/Auction';
import { Subscription } from 'rxjs';
import { AuctionService } from '../../auction.service';
import { PoButtonGroupItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-auction-listing',
  templateUrl: './auction-listing.component.html',
  styleUrls: ['./auction-listing.component.css']
})
export class AuctionListingComponent implements OnInit, OnDestroy {

  auctionSub: Subscription;
  auctions: Auction[] = [];

  actions: Array<PoButtonGroupItem> = [
    {
      label: 'Editar',
      icon: 'po-icon-edit',
      tooltip: 'Você será redirecionado para a tela de edição.',
      action: this.editAuction.bind(this)
    },

    {
      label: 'Excluir',
      icon: 'po-icon-delete',
      tooltip: 'Um modal de confirmação será aberto.',
      action: this.deleteAuction.bind(this)
    }
  ];

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionSub = this.auctionService.getAllAuctions()
      .subscribe((response: Auction[]) => this.auctions = response);
  }

  ngOnDestroy() {
    if (this.auctionSub) {
      this.auctionSub.unsubscribe();
    }
  }

  editAuction() {
    console.log('edit');
  }

  deleteAuction() {
    console.log('delete');
  }

}
