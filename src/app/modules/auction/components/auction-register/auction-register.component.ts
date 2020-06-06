import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDynamicFormField, PoNotificationService, PoDynamicFormComponent } from '@po-ui/ng-components';
import { Auction } from 'src/app/classes/Auction';
import { Subscription } from 'rxjs';
import { AuctionService } from '../../auction.service';

@Component({
  selector: 'app-auction-register',
  templateUrl: './auction-register.component.html',
  styleUrls: ['./auction-register.component.css']
})
export class AuctionRegisterComponent implements OnInit {

  @ViewChild('dynamicForm') form: PoDynamicFormComponent;
  auction: Auction = {};

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
    },
    {
      property: 'endDate',
      label: 'Finalizado',
      type: 'date',
      format: 'dd/MM/yyyy',
      required: true,
      gridColumns: 4,
      gridSmColumns: 12,
      minValue: '2020-06-06',
      errorMessage: 'A data deve ser igual ou maior que hoje.',
      visible: false,
    }
  ];

  constructor(
    private auctionService: AuctionService,
    private poNotification: PoNotificationService,
  ) { }

  ngOnInit() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.auction = {
      name: 'Leilão...',
      openingDate: { date: `${yyyy}-${mm}-${dd}` },
    };
  }

  submit() {
    const obj = { ...this.form.value };

    Object.entries(obj)
      .map(([key, value]) => {
        if (key === 'usedItem') {
          obj[key] = this.validateUsedItem(value as string);
        }

        if (key === 'initialValue') {
          obj[key] = (value as string).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        }
      })

    this.auctionSub = this.auctionService.saveAuction(obj)
      .subscribe(response => console.log(response));

    this.poNotification.success('Leilão criado com sucesso');
  }

  validateUsedItem(item: string): boolean {
    return item === 'Sim' ? true : false;
  }

}
