import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSecondComponent } from './sign-up-second.component';

describe('SignUpSecondComponent', () => {
  let component: SignUpSecondComponent;
  let fixture: ComponentFixture<SignUpSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
