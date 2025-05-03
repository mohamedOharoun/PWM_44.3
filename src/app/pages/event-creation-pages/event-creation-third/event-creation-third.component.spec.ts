import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationThirdComponent } from './event-creation-third.component';

describe('EventCreationThirdComponent', () => {
  let component: EventCreationThirdComponent;
  let fixture: ComponentFixture<EventCreationThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationThirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreationThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
