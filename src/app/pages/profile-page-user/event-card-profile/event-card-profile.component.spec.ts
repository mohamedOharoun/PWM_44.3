import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardProfileComponent } from './event-card-profile.component';

describe('EventCardProfileComponent', () => {
  let component: EventCardProfileComponent;
  let fixture: ComponentFixture<EventCardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
