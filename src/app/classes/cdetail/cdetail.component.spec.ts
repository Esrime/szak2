import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdetailComponent } from './cdetail.component';

describe('CdetailComponent', () => {
  let component: CdetailComponent;
  let fixture: ComponentFixture<CdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
