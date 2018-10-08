import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPeopleComponent } from './popular-people.component';

describe('PopularPeopleComponent', () => {
  let component: PopularPeopleComponent;
  let fixture: ComponentFixture<PopularPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
