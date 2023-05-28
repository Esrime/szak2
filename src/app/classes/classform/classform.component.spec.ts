import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ClassformComponent } from './classform.component';


describe('ClassformComponent', () => {
  let component: ClassformComponent;
  let fixture: ComponentFixture<ClassformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassformComponent, ],
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display', () => {
    component.filteredSets=[];
    component.students=[];
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML).toContain('Create a new class');
    expect(compiled.querySelector('#tset').innerHTML).toContain('No set made by you was found.');
    expect(compiled.querySelector('#tstudents').innerHTML).toContain('No student was found.');
  });
});
