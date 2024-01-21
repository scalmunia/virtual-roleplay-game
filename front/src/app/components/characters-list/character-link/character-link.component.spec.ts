import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLinkComponent } from './character-link.component';

describe('CharacterLinkComponent', () => {
  let component: CharacterLinkComponent;
  let fixture: ComponentFixture<CharacterLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterLinkComponent]
    });
    fixture = TestBed.createComponent(CharacterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
