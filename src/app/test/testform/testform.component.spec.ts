import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestformComponent } from './testform.component';

describe('TestformComponent', () => {
  let component: TestformComponent;
  let fixture: ComponentFixture<TestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
