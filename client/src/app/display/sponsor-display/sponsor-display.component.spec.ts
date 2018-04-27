import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDisplayComponent } from './sponsor-display.component';

describe('SponsorDisplayComponent', () => {
  let component: SponsorDisplayComponent;
  let fixture: ComponentFixture<SponsorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
