import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCounselorsComponent } from './all-counselors.component';

describe('AllCounselorsComponent', () => {
  let component: AllCounselorsComponent;
  let fixture: ComponentFixture<AllCounselorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCounselorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCounselorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
