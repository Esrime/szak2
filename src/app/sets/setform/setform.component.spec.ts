import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetformComponent } from './setform.component';

describe('SetformComponent', () => {
  let component: SetformComponent;
  let fixture: ComponentFixture<SetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
