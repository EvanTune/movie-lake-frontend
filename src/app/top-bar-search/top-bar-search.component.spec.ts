import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarSearchComponent } from './top-bar-search.component';

describe('TopBarSearchComponent', () => {
  let component: TopBarSearchComponent;
  let fixture: ComponentFixture<TopBarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
