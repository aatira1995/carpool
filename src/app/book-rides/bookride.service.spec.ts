import { TestBed, inject } from '@angular/core/testing';

import { BookrideService } from './bookride.service';

describe('BookrideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookrideService]
    });
  });

  it('should be created', inject([BookrideService], (service: BookrideService) => {
    expect(service).toBeTruthy();
  }));
});
