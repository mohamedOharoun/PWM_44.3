import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationSecondComponent } from './event-creation-second.component';

describe('EventCreationSecondComponent', () => {
  let component: EventCreationSecondComponent;
  let fixture: ComponentFixture<EventCreationSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
