export class User {
  constructor(
    public _id?: number,
    public name?: string,
    public login?: string,
    public password?: string,
    public active?: boolean
  ) { }
}