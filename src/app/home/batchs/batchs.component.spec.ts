import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchsComponent } from './batchs.component';

describe('BatchsComponent', () => {
  let component: BatchsComponent;
  let fixture: ComponentFixture<BatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
