import { CardItem } from "./card.model";

export class Set {
  constructor(public title: string,public cards: CardItem[],public itemNum: number,public creator:string,public creatorId?: string) {
  }
}