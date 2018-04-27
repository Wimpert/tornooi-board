import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutRoundComponent } from './knockout-round.component';

describe('KnockoutRoundComponent', () => {
  let component: KnockoutRoundComponent;
  let fixture: ComponentFixture<KnockoutRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
