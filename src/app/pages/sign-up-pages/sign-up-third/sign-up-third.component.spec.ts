import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpThirdComponent } from './sign-up-third.component';

describe('SignUpThirdComponent', () => {
  let component: SignUpThirdComponent;
  let fixture: ComponentFixture<SignUpThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpThirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
