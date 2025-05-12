import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsResultComponent } from './leads-result.component';

describe('LeadsResultComponent', () => {
  let component: LeadsResultComponent;
  let fixture: ComponentFixture<LeadsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
