import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundRowComponent } from './ground-row.component';

describe('GroundRowComponent', () => {
  let component: GroundRowComponent;
  let fixture: ComponentFixture<GroundRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
