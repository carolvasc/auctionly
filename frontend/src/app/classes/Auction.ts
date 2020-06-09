import { User } from './User'
import { IDateApi } from '../interfaces/DateApi'

export class Auction {
  constructor(
    public _id?: number,
    public name?: string,
    public initialValue?: number,
    public usedItem?: boolean,
    public user?: User,
    public openingDate?: IDateApi,
    public endDate?: IDateApi,
  ) { }
}