import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutMatchComponent } from './knockout-match.component';

describe('KnockoutMatchComponent', () => {
  let component: KnockoutMatchComponent;
  let fixture: ComponentFixture<KnockoutMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockoutMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
