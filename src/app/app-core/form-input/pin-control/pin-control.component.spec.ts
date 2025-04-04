import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinControlComponent } from './pin-control.component';

describe('PinControlComponent', () => {
  let component: PinControlComponent;
  let fixture: ComponentFixture<PinControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
