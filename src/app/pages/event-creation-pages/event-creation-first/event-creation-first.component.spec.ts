import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationFirstComponent } from './event-creation-first.component';

describe('EventCreationFirstComponent', () => {
  let component: EventCreationFirstComponent;
  let fixture: ComponentFixture<EventCreationFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
