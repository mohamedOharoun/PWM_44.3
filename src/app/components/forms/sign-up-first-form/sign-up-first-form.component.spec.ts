import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFirstFormComponent } from './sign-up-first-form.component';

describe('SignUpFirstFormComponent', () => {
  let component: SignUpFirstFormComponent;
  let fixture: ComponentFixture<SignUpFirstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFirstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFirstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
