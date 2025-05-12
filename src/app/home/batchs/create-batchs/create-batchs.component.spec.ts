import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchsComponent } from './create-batchs.component';

describe('CreateBatchsComponent', () => {
  let component: CreateBatchsComponent;
  let fixture: ComponentFixture<CreateBatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBatchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
