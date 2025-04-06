import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSecondFormComponent } from './sign-up-second-form.component';

describe('SignUpSecondFormComponent', () => {
  let component: SignUpSecondFormComponent;
  let fixture: ComponentFixture<SignUpSecondFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSecondFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpSecondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
