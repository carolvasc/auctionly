import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Bibliotecas
import { Subscription } from 'rxjs';
// Classes e interfaces
import { Auction } from '../../../../classes/Auction';
// Serviços e configurações
import { AuctionService } from '../../auction.service';
// Componentes
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { IApiResponse } from 'src/app/interfaces/ApiResponse';

@Component({
  selector: 'app-auction-listing',
  templateUrl: './auction-listing.component.html',
  styleUrls: ['./auction-listing.component.css']
})
export class AuctionListingComponent implements OnInit, OnDestroy {

  currentAuction: Auction;
  @ViewChild('modal') modal: PoModalComponent;

  getAuctionSub: Subscription;
  reloadListSub: Subscription;
  deleteAuctionSub: Subscription;

  modalContent = '';
  auctions: Auction[] = [];

  confirm: PoModalAction = {
    action: () => {
      this.deleteAuction()
    },
    label: 'Confirmar'
  };

  cancel: PoModalAction = {
    action: () => {
      this.modal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  confirmLabel: string = 'Confirmar';
  cancelLabel: string = 'Cancelar';

  constructor(
    private router: Router,
    private auctionService: AuctionService,
    private poNotification: PoNotificationService,
  ) { }

  ngOnInit(): void {
    this.getAllAuctions();

    // Ao excluir um leilão a lista será atualizada
    this.reloadListSub = this.auctionService.reloadListSubject
      .subscribe(reload => reload === true ? this.getAllAuctions() : null);
  }

  ngOnDestroy() {
    if (this.getAuctionSub) {
      this.getAuctionSub.unsubscribe();
    }

    if (this.deleteAuctionSub) {
      this.deleteAuctionSub.unsubscribe();
    }

    if (this.reloadListSub) {
      this.reloadListSub.unsubscribe();
    }
  }

  /**
   * Popula a propriedade auctions com os leilões cadastrados.
   */
  getAllAuctions() {
    this.getAuctionSub = this.auctionService.getAllAuctions()
      .subscribe((response: IApiResponse) => this.auctions = response.data as Auction[]);
  }

  /**
   * Redireciona para a tela de edição.
   * @param auction Leilão selecionado.
   */
  redirectToEdition(auction: Auction) {
    this.router.navigate(['/leilao/editar', auction._id]);
  }

  /**
   * Exclui o leilão selecionado.
   */
  deleteAuction() {
    if (this.currentAuction) {
      this.deleteAuctionSub = this.auctionService.deleteAuction(this.currentAuction._id)
        .subscribe(() => {
          this.poNotification.success(`Leilão excluído com sucesso.`);
          this.auctionService.reloadListSubject.next(true);
          this.modal.close();
        }, error => {
          this.poNotification.error(`Algo deu errado... ${error}`);
          this.modal.close();
        });
    }
  }

  /**
   * Modal de confirmação.
   * @param auction Leilão selecionado.
   */
  modalConfirmation(auction: Auction) {
    this.currentAuction = auction;
    this.modalContent = `Você tem certeza que deseja excluir o leilão ${auction.name}?`;

    this.confirm.label = this.confirmLabel;
    this.cancel.label = this.cancelLabel;

    this.modal.open();
  }

}
