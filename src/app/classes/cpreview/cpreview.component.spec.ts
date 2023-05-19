import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpreviewComponent } from './cpreview.component';

describe('CpreviewComponent', () => {
  let component: CpreviewComponent;
  let fixture: ComponentFixture<CpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
