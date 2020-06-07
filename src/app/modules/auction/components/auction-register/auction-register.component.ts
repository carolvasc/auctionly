import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Bibliotecas
import { Subscription } from 'rxjs';
// Classes e interfaces
import { Auction } from 'src/app/classes/Auction';
// Serviços e configurações
import { AuctionService } from '../../auction.service';
// Componentes
import { PoDynamicFormField, PoNotificationService, PoDynamicFormComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-auction-register',
  templateUrl: './auction-register.component.html',
  styleUrls: ['./auction-register.component.css']
})
export class AuctionRegisterComponent implements OnInit, OnDestroy {

  @ViewChild('dynamicForm') form: PoDynamicFormComponent;
  auction: Auction = null;
  auctionSub: Subscription;

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 4,
      gridSmColumns: 12
    },
    {
      property: 'initialValue',
      label: 'Valor inicial',
      required: true,
      minLength: 1,
      gridColumns: 3,
      gridSmColumns: 12
    },
    {
      property: 'usedItem',
      label: 'Usado',
      required: true,
      gridColumns: 3,
      gridSmColumns: 12,
      options: ['Sim', 'Não']
    },
    {
      property: 'openingDate',
      label: 'Data de Abertura',
      type: 'date',
      format: 'dd/MM/yyyy',
      required: true,
      gridColumns: 4,
      gridSmColumns: 12,
      minValue: '2020-06-06',
      errorMessage: 'A data deve ser igual ou maior que hoje.'
    }
  ];

  constructor(
    private auctionService: AuctionService,
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
  ) {
    this.callAsyncData();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.auctionSub) {
      this.auctionSub.unsubscribe();
    }
  }

  /**
   * Submete o formulário.
   */
  onSubmit() {
    const obj = { ...this.form.value };

    Object.entries(obj)
      .map(([key, value]) => {
        if (key === 'usedItem') {
          obj[key] = this.transformUsedItemToBoolean(value.toString());
        }

        if (key === 'initialValue') {
          obj[key] = (value.toString()).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        }
      })

    //  TODO: Adicionar o usuario ao salvar
    if (!this.auction) {
      this.save(obj);
    } else {
      this.update(obj);
    }
  }

  /**
   * Salva um novo leilão.
   * @param auction Leilão selecionado.
   */
  save(auction) {
    this.auctionSub = this.auctionService.saveAuction(auction)
      .subscribe(response => {
        this.poNotification.success(`O leilão ${response.name} foi criado com sucesso. `);
      }, error => {
        this.poNotification.error(`Algo deu errado... ${error}`);
      });
  }

  /**
   * Edita um leilão já existente, podendo inclusive adicionar novos campos como a data de finalização.
   * @param auction Leilão selecionado.
   */
  update(auction) {
    this.auctionSub = this.auctionService.updateAuction(auction)
      .subscribe(response => {
        this.poNotification.success(`O leilão ${response.name} foi alterado com sucesso. `);
      }, error => {
        this.poNotification.error(`Algo deu errado... ${error}`);
      });
  }

  /**
   * Transforma o valor do item usado em boolean antes de enviar para a API.
   * @param item Item usado (Sim/Não).
   */
  transformUsedItemToBoolean(item: string): boolean {
    return item === 'Sim' ? true : false;
  }

  /**
   * Transforma o valor do item usado em string antes de renderiza-lo na tela.
   * @param item Item usado (true/false).
   */
  transformUsedItemToString(item: boolean): string {
    return item === true ? 'Sim' : 'Não';
  }

  formatDate(item: string) {
    // TODO: Criar todas as formatações de data aqui.
  }

  /**
   * Recupera os dados vindos através da rota.
   */
  async activatedRouteParams() {
    await new Promise((resolve) => {
      this.activatedRoute.data
        .subscribe((data: { auction }) => {
          if (data.auction) {
            let auction = data.auction;

            Object.entries(data.auction)
              .map(([key, value]) => {
                if (key === 'usedItem') {
                  auction[key] = this.transformUsedItemToString(value as boolean);
                }
              });

            this.auction = auction;
          }
          resolve();
        });
    })
  }

  /**
   * Adiciona o campo de data finalizada no formulário caso esteja no modo edição.
   */
  callAsyncData() {
    this.activatedRouteParams()
      .then(() => {
        if (this.auction) {
          this.fields.push({
            property: 'endDate',
            label: 'Finalizado',
            type: 'date',
            format: 'dd/MM/yyyy',
            gridColumns: 4,
            gridSmColumns: 12,
            minValue: '2020-06-06',
            errorMessage: 'A data deve ser igual ou maior que hoje.',
            visible: true,
          })
        }
      });
  }

}
