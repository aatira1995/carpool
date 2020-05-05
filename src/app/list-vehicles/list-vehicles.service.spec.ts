import { TestBed, inject } from '@angular/core/testing';

import { ListVehiclesService } from './list-vehicles.service';

describe('ListVehiclesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListVehiclesService]
    });
  });

  it('should be created', inject([ListVehiclesService], (service: ListVehiclesService) => {
    expect(service).toBeTruthy();
  }));
});
