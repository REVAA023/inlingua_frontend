import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLeadsComponent } from './export-leads.component';

describe('ExportLeadsComponent', () => {
  let component: ExportLeadsComponent;
  let fixture: ComponentFixture<ExportLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
