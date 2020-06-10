import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Bibliotecas
import { Subscription } from 'rxjs';
// Classes e interfaces
import { Auction } from 'src/app/classes/Auction';
// Serviços e configurações
import { AuctionService } from '../../auction.service';
// Componentes
import { PoDynamicFormField, PoNotificationService, PoDynamicFormComponent } from '@po-ui/ng-components';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IApiResponse } from 'src/app/interfaces/ApiResponse';
import { LoginService } from 'src/app/components/login/login.service';

@Component({
  selector: 'app-auction-register',
  templateUrl: './auction-register.component.html',
  styleUrls: ['./auction-register.component.css']
})
export class AuctionRegisterComponent implements OnInit, OnDestroy {

  @ViewChild('dynamicForm') form: PoDynamicFormComponent;
  auction: Auction = null;
  auctionSub: Subscription;

  editMode: boolean = false;

  auctionForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private auctionService: AuctionService,
    private activatedRoute: ActivatedRoute,
    private poNotification: PoNotificationService,
  ) { }

  ngOnInit() {
    this.createReactiveForm();

    this.activatedRouteParams();
  }

  ngOnDestroy() {
    if (this.auctionSub) {
      this.auctionSub.unsubscribe();
    }
  }

  createReactiveForm() {
    this.auctionForm = this.fb.group({
      _id: [null],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      initialValue: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      usedItem: [true, [Validators.required]],
      openingDate: ['', Validators.required],
      endDate: ['']
    });
  }

  resetForm() {
    const { _id, name, initialValue, usedItem, endDate, openingDate } = this.auction;

    this.auctionForm.reset({
      _id: _id,
      name: name,
      initialValue: initialValue,
      usedItem: usedItem,
      endDate: endDate || null,
      openingDate: openingDate
    });
  }

  /**
   * Submete o formulário.
   */
  onSubmit() {
    const user = this.loginService.getUser();
    const auction = { ...this.auctionForm.value, user: user._id };

    if (!this.auction) {
      this.save(auction);
    } else {
      this.update(auction);
    }
  }

  /**
   * Cria um novo leilão.
   * @param auction Leilão selecionado.
   */
  save(auction: Auction) {
    this.auctionSub = this.auctionService.saveAuction(auction)
      .subscribe(() => {
        this.poNotification.success(`Leilão criado com sucesso. `);
        setTimeout(() => this.router.navigate(['/leilao/listar']), 1500); // Redireciona para a listagem
      }, error => {
        this.poNotification.error(`Algo deu errado... ${error}`);
      });
  }

  /**
   * Edita o leilão, podendo inclusive adicionar novos campos como a data de finalização.
   * @param auction Leilão selecionado.
   */
  update(auction: Auction) {
    this.auctionSub = this.auctionService.updateAuction(auction)
      .subscribe(() => {
        this.poNotification.success(`Leilão editado com sucesso. `);
        setTimeout(() => this.router.navigate(['/leilao/listar']), 1500); // Redireciona para a listagem
      }, error => {
        this.poNotification.error(`Algo deu errado... ${error}`);
      });
  }

  /**
   * Recupera os dados do leilão através da rota.
   */
  async activatedRouteParams() {
    await new Promise((resolve) => {
      this.activatedRoute.data
        .subscribe((data: { editMode: boolean, auction: IApiResponse }) => {
          if (data.editMode) {
            this.editMode = data.editMode;
          }

          if (data.auction.data) {
            this.auction = data.auction.data as Auction;

            this.resetForm();
          }

          resolve();
        });
    })
  }

}
