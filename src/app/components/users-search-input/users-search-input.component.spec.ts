import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSearchInputComponent } from './users-search-input.component';

describe('UsersSearchInputComponent', () => {
  let component: UsersSearchInputComponent;
  let fixture: ComponentFixture<UsersSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSearchInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
