import { User } from './User'

export class Auction {
  constructor(
    public _id?: number,
    public name?: string,
    public initialValue?: number,
    public usedItem?: boolean,
    public user?: string, // ID do usuário
    public openingDate?: string,
    public endDate?: string,
  ) { }
}