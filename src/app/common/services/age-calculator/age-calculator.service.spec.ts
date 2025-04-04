import { TestBed } from '@angular/core/testing';
import { AgeCalculatorService } from './age-calculator.service';


describe('AgeCalculatorService', () => {
  let service: AgeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
