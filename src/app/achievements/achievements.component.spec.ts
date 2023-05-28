import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AchievementsComponent } from './achievements.component';

const statMock={
  setCreated:0
}

describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
    component.as.stats=statMock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no achievement', () => {
    component.as.stats= {setCreated: 0, setPerfect: 0, testSolved:0, testPerfect:0}
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect (compiled.querySelector('p')).toBeTruthy();
  });
  it('achievement exists setCreated', () => {
    component.as.stats= {setCreated: 1}
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect (compiled.querySelector('ul')).toBeTruthy();
    expect (compiled.querySelector('li').innerHTML).toContain('The journey begins');
  });
  it('achievement exists setPerfect', () => {
    component.as.stats= {setPerfect: 1}
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect (compiled.querySelector('ul')).toBeTruthy();
    expect (compiled.querySelector('li').innerHTML).toContain('Just perfect');
  });
  it('achievement exists testSolved', () => {
    component.as.stats= {testSolved: 1}
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect (compiled.querySelector('ul')).toBeTruthy();
    expect (compiled.querySelector('li').innerHTML).toContain('...and done!');
  });
  it('achievement exists testPerfect', () => {
    component.as.stats= {testPerfect: 1}
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect (compiled.querySelector('ul')).toBeTruthy();
    expect (compiled.querySelector('li').innerHTML).toContain('Studying was worth it');
  });
});
