import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTheatresComponent } from './in-theatres.component';

describe('InTheatresComponent', () => {
  let component: InTheatresComponent;
  let fixture: ComponentFixture<InTheatresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTheatresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
