import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSpinnerComponent } from './full-spinner.component';

describe('FullSpinnerComponent', () => {
  let component: FullSpinnerComponent;
  let fixture: ComponentFixture<FullSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
