import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipcardComponent } from './flipcard.component';

const MOCK_cards= [{front:'a',back:'a'}]
const MOCK_card = {front:'a',back:'a'}

describe('FlipcardComponent', () => {
  let component: FlipcardComponent;
  let fixture: ComponentFixture<FlipcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipcardComponent);
    component = fixture.componentInstance;
    component.cards=MOCK_cards;
    component.card=MOCK_card;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
