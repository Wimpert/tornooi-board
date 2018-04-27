import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDisplayComponent } from './groups-display.component';

describe('GroupsDisplayComponent', () => {
  let component: GroupsDisplayComponent;
  let fixture: ComponentFixture<GroupsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
