import { User } from './User'
import { IDateApi } from '../interfaces/DateApi'

export class Auction {
  constructor(
    public id?: number,
    public name?: string,
    public initialValue?: number,
    public itemUsed?: boolean,
    public user?: User,
    public openingDate?: IDateApi,
    public endDate?: IDateApi,
  ) { }
}