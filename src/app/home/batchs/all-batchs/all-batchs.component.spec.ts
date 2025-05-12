import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBatchsComponent } from './all-batchs.component';

describe('AllBatchsComponent', () => {
  let component: AllBatchsComponent;
  let fixture: ComponentFixture<AllBatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBatchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
