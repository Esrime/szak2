import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

import { FilterTextPipe, ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent,SpinnerComponent,FilterTextPipe ],
      imports:[HttpClientTestingModule, FormsModule, RouterModule],
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

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.setList=[];
    component.ds.isWorking=false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('no sets', () => {
    let compiled= fixture.debugElement.nativeElement;
    
    expect(component.setList.length).toBe(0);
    expect(compiled.querySelector('p')).toBeTruthy();
    expect(compiled.querySelector('#tp').textContent).toContain('There are no sets yet.');
  });
  it('more sets', () => {
    component.setList=[{title:'', cards:[], itemNum:0, creator:''}]
    let compiled= fixture.debugElement.nativeElement;
    fixture.detectChanges()
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
  it('logged out', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeFalsy();
  });
  it('logged in', () => {
    component.as.isAuthenticated=true;
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeTruthy();
  });
});
