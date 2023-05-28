import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

import { ClistComponent } from './clist.component';

describe('ClistComponent', () => {
  let component: ClistComponent;
  let fixture: ComponentFixture<ClistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClistComponent, SpinnerComponent],
      imports: [HttpClientTestingModule, RouterModule],
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

    fixture = TestBed.createComponent(ClistComponent);
    component = fixture.componentInstance;
    component.ds.isWorking=false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('no class', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('You currently have no classes.');
  });
  it('more class', () => {
    component.classList=[{title:'',sets: [], students: [], creator:"", }]
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
  it('student add', () => {
    component.as.role="student"
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeFalsy();
  });
  it('teacher add', () => {
    component.as.role="teacher"
    component.as.isAuthenticated=true
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeTruthy();
  });
});
