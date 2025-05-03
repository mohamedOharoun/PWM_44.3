import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageUserComponent } from './profile-page-user.component';

describe('ProfilePageUserComponent', () => {
  let component: ProfilePageUserComponent;
  let fixture: ComponentFixture<ProfilePageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
