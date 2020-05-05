import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRidesComponent } from './book-rides.component';

describe('BookRidesComponent', () => {
  let component: BookRidesComponent;
  let fixture: ComponentFixture<BookRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
