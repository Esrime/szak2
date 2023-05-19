import { Component, Input } from '@angular/core';
import { CardItem } from 'src/app/models/card.model';

@Component({
  selector: 'app-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.css']
})
export class FlipcardComponent {
  @Input() card: CardItem;
  public cards;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cards = document.querySelectorAll('.card');
    [...this.cards].forEach((card)=>{
      card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
      });
    });
  }
}
