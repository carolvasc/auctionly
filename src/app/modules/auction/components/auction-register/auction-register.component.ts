import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-auction-register',
  templateUrl: './auction-register.component.html',
  styleUrls: ['./auction-register.component.css']
})
export class AuctionRegisterComponent implements OnInit {

  person = {};

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      divider: 'PERSONAL DATA',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 4,
      gridSmColumns: 12
    },
    { property: 'initialValue', label: 'Valor inicial', mask: '1.000.000', gridColumns: 3, gridSmColumns: 12 },
    { property: 'itemUsed', label: 'Usado', gridColumns: 3, gridSmColumns: 12, options: ['Sim', 'Não'] },
    {
      property: 'openingDate',
      label: 'Data de Abertura',
      type: 'date',
      format: 'dd/MM/yyyy',
      gridColumns: 4,
      gridSmColumns: 12,
      minValue: '2020-06-06',
      errorMessage: 'A data deve ser igual ou maior que hoje.'
    }
  ];

  constructor(public poNotification: PoNotificationService) { }

  ngOnInit() {
    this.person = {
      name: 'Leilão 1',
      openingDate: '2020-06-07',
    };
  }

}
