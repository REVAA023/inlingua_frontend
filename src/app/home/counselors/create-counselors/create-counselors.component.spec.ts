import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCounselorsComponent } from './create-counselors.component';

describe('CreateCounselorsComponent', () => {
  let component: CreateCounselorsComponent;
  let fixture: ComponentFixture<CreateCounselorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCounselorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCounselorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
