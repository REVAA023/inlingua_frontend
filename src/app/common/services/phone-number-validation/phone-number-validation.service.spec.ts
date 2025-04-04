import { TestBed } from '@angular/core/testing';

import { PhoneNumberValidationService } from './phone-number-validation.service';

describe('PhoneNumberValidationService', () => {
  let service: PhoneNumberValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumberValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
