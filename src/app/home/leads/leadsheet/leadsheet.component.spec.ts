import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsheetComponent } from './leadsheet.component';

describe('LeadsheetComponent', () => {
  let component: LeadsheetComponent;
  let fixture: ComponentFixture<LeadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
