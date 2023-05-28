import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { FlipcardComponent } from '../flipcard/flipcard.component';

import { DetailComponent } from './detail.component';

const MOCK_set ={
  title:'string',
  cards:[{front:'',back:''}],
  itemNum: 0,
  creator:''
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailComponent, SpinnerComponent, FlipcardComponent ],
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

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.set=MOCK_set;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('too short', () => {
    component.as.isAuthenticated=true
    component.set.itemNum=2;
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp').textContent).toContain('You need to have at least 5 cards in a set to start practice.');
  });
  it('long enough', () => {
    component.as.isAuthenticated=true
    component.set.itemNum=5
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tb').textContent).toContain('Practice');
  });
});
