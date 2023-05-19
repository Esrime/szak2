import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpracticeComponent } from './tpractice.component';

describe('TpracticeComponent', () => {
  let component: TpracticeComponent;
  let fixture: ComponentFixture<TpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
