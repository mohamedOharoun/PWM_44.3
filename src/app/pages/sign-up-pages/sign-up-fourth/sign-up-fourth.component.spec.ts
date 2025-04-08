import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFourthComponent } from './sign-up-fourth.component';

describe('SignUpFourthComponent', () => {
  let component: SignUpFourthComponent;
  let fixture: ComponentFixture<SignUpFourthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFourthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
