import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PouleMatchComponent } from './poule-match.component';

describe('PouleMatchComponent', () => {
  let component: PouleMatchComponent;
  let fixture: ComponentFixture<PouleMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PouleMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PouleMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
