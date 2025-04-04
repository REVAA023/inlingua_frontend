import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlacerComponent } from './input-placer.component';

describe('InputPlacerComponent', () => {
  let component: InputPlacerComponent;
  let fixture: ComponentFixture<InputPlacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPlacerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPlacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
