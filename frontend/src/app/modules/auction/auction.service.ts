import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Auction } from '../../classes/Auction';
import { IApiResponse } from '../../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) { }

  /**
   * Salva um novo leilão
   * @param auction Dados do leilão
   */
  saveAuction(auction: Auction): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.config.apiUrl}/auction`, auction)
  }

  /**
   * Retorna um único leilão
   * @param idClient ID do leilão a ser retornado
   */
  getAuction(idAuction: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.config.apiUrl}/api/auction/${idAuction}`);
  }

  /**
   * Atualiza os dados do leilão
   * @param leilao Leilão com os dados atualizados
   */
  updateAuction(auction: Auction): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.config.apiUrl}/api/auction/${auction._id}`, auction);
  }

  /**
   * Exclui o leilão
   * @param idAuction ID do leilão a ser removido
   */
  deleteAuction(idAuction: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.config.apiUrl}/api/auction/${idAuction}`);
  }

  /**
   * Retorna todos os leilões
   */
  getAllAuctions(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.config.apiUrl}/api/auction/all`);
  }

}
