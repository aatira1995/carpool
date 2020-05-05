import { TestBed, inject } from '@angular/core/testing';

import { ListRidesService } from './list-rides.service';

describe('ListRidesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListRidesService]
    });
  });

  it('should be created', inject([ListRidesService], (service: ListRidesService) => {
    expect(service).toBeTruthy();
  }));
});
