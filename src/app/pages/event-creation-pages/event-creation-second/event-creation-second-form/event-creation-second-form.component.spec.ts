import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationSecondFormComponent } from './event-creation-second-form.component';

describe('EventCreationSecondFormComponent', () => {
  let component: EventCreationSecondFormComponent;
  let fixture: ComponentFixture<EventCreationSecondFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationSecondFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationSecondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
