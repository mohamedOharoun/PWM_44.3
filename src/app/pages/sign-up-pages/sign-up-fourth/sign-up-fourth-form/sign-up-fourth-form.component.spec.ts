import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFourthFormComponent } from './sign-up-fourth-form.component';

describe('SignUpFourthFormComponent', () => {
  let component: SignUpFourthFormComponent;
  let fixture: ComponentFixture<SignUpFourthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFourthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFourthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
