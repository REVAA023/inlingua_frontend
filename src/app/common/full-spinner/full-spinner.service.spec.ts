import { TestBed } from '@angular/core/testing';

import { FullSpinnerService } from './full-spinner.service';

describe('FullSpinnerService', () => {
  let service: FullSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
