import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRegisterFormComponent } from './students-register-form.component';

describe('StudentsRegisterFormComponent', () => {
  let component: StudentsRegisterFormComponent;
  let fixture: ComponentFixture<StudentsRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsRegisterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
