import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSettingComponent } from './trainer-setting.component';

describe('TrainerSettingComponent', () => {
  let component: TrainerSettingComponent;
  let fixture: ComponentFixture<TrainerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
