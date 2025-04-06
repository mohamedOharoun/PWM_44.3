import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpThirdFormComponent } from './sign-up-third-form.component';

describe('SignUpThirdFormComponent', () => {
  let component: SignUpThirdFormComponent;
  let fixture: ComponentFixture<SignUpThirdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpThirdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpThirdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
