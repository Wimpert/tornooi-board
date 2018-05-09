import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorContainerComponent } from './sponsor-container.component';

describe('SponsorContainerComponent', () => {
  let component: SponsorContainerComponent;
  let fixture: ComponentFixture<SponsorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
