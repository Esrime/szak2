import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

import { CdetailComponent } from './cdetail.component';

const MOCK_class = {
  title: 'string',
  sets: [],
  students: [],
  creator: 'string',
  tests: null
}

describe('CdetailComponent', () => {
  let component: CdetailComponent;
  let fixture: ComponentFixture<CdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdetailComponent, SpinnerComponent],
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

    fixture = TestBed.createComponent(CdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display details', () => {
    component.class = MOCK_class;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
    expect(compiled.querySelector('h1').innerHTML).toContain('string');
    expect(compiled.querySelectorAll('h2')[0].innerHTML).toContain('Sets');
    expect(compiled.querySelectorAll('h2')[1].innerHTML).toContain('Tests');
    expect(compiled.querySelector('#tp').innerHTML).toContain('There are currently no tests for this class');
  });

});

