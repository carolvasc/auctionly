import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Auction } from '../../classes/Auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) { }

  /**
   * Salva um novo leilão
   * @param auction Dados do leilão
   */
  saveAuction(auction: Auction): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/auction`, auction)
  }

  /**
   * Retorna um único leilão
   * @param idClient ID do leilão a ser retornado
   */
  getAuction(idAuction: number): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/auction/${idAuction}`);
  }

  /**
   * Atualiza os dados do leilão
   * @param leilao Leilão com os dados atualizados
   */
  updateAuction(auction: Auction): Observable<any> {
    return this.http.put<any>(`${this.config.apiUrl}/auction/${auction.id}`, auction);
  }

  /**
   * Exclui o leilão
   * @param idAuction ID do leilão a ser removido
   */
  deleteAuction(idAuction: number): Observable<any> {
    return this.http.delete<any>(`${this.config.apiUrl}/auction/${idAuction}`);
  }

  /**
   * Retorna todos os leilões
   */
  getAllAuctions(): Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/auction`);
  }

}
