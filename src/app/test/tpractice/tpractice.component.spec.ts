import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TpracticeComponent } from './tpractice.component';

const MOCK_answer= [{text:'',ind:0},{text:'',ind:1},{text:'',ind:2},{text:'',ind:3}]
const MOCK_cards = [{front:'',back:''}];

describe('TpracticeComponent', () => {
  let component: TpracticeComponent;
  let fixture: ComponentFixture<TpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpracticeComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: '123' })
            }
          }
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpracticeComponent);
    component = fixture.componentInstance;
    component.cards= MOCK_cards;
    component.answers= MOCK_answer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
