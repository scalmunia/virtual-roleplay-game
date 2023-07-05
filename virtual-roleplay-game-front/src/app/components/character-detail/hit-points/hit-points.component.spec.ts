import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitPointsComponent } from './hit-points.component';

describe('HitPointsComponent', () => {
  let component: HitPointsComponent;
  let fixture: ComponentFixture<HitPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HitPointsComponent]
    });
    fixture = TestBed.createComponent(HitPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
