import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLodingComponent } from './page-loding.component';

describe('PageLodingComponent', () => {
  let component: PageLodingComponent;
  let fixture: ComponentFixture<PageLodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLodingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
