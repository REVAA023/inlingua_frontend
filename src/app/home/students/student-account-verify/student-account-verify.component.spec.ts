import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountVerifyComponent } from './student-account-verify.component';

describe('StudentAccountVerifyComponent', () => {
  let component: StudentAccountVerifyComponent;
  let fixture: ComponentFixture<StudentAccountVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAccountVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAccountVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
