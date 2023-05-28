import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TdetailComponent } from './tdetail.component';

const MOCK_test= {sets:[]}

describe('TdetailComponent', () => {
  let component: TdetailComponent;
  let fixture: ComponentFixture<TdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdetailComponent ],
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

    fixture = TestBed.createComponent(TdetailComponent);
    component = fixture.componentInstance;
    component.test= MOCK_test;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('not enough cards', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Not enough cards');
  });
  it('enough cards', () => {
    component.moreThan4=true
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Take test');
  });
  it('student attempts', () => {
    component.as.role='student'
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4')).toBeFalsy();
  });
  it('teacher 0 attempt', () => {
    component.as.role='teacher'
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp').textContent).toContain('No student has completed the test yet.');
  });
  it('teacher more attempts', () => {
    component.as.role='teacher'
    component.attempts= [{mistakes:0, student:{emai:'', role:'', username:''}}]
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp')).toBeFalsy();
  });
});
