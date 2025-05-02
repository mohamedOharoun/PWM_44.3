import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNavigationComponent } from './social-navigation.component';

describe('SocialNavigationComponent', () => {
  let component: SocialNavigationComponent;
  let fixture: ComponentFixture<SocialNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
