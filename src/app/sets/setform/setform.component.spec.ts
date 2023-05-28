import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SetformComponent } from './setform.component';

describe('SetformComponent', () => {
  let component: SetformComponent;
  let fixture: ComponentFixture<SetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetformComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
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

    fixture = TestBed.createComponent(SetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
