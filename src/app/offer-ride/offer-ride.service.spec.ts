import { TestBed, inject } from '@angular/core/testing';

import { OfferRideService } from './offer-ride.service';

describe('OfferRideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferRideService]
    });
  });

  it('should be created', inject([OfferRideService], (service: OfferRideService) => {
    expect(service).toBeTruthy();
  }));
});
