import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationFirstFormComponent } from './event-creation-first-form.component';

describe('EventCreationFirstFormComponent', () => {
  let component: EventCreationFirstFormComponent;
  let fixture: ComponentFixture<EventCreationFirstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationFirstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationFirstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
