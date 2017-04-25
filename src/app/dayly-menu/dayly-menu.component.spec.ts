import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaylyMenuComponent } from './dayly-menu.component';

describe('DaylyMenuComponent', () => {
  let component: DaylyMenuComponent;
  let fixture: ComponentFixture<DaylyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaylyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaylyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
