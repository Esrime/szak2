import { Set } from "./set.model";

export class Class {
  constructor(
  public title:string,
  public sets: Set[],
  public students,
  public creator: string,
  public id?:string,
  public tests?:any){}
}