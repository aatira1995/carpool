import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRidesComponent } from './list-rides.component';

describe('ListRidesComponent', () => {
  let component: ListRidesComponent;
  let fixture: ComponentFixture<ListRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListRidesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
