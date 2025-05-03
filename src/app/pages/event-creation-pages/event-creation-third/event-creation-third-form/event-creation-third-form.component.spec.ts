import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationThirdFormComponent } from './event-creation-third-form.component';

describe('EventCreationThirdFormComponent', () => {
  let component: EventCreationThirdFormComponent;
  let fixture: ComponentFixture<EventCreationThirdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationThirdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationThirdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
