import { TestBed, inject } from '@angular/core/testing';

import { RegisterService } from './register.service';

describe('UserDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterService]
    });
  });

  it('should be created', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
