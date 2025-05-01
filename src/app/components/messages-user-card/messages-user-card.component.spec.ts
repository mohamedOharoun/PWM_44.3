import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesUserCardComponent } from './messages-user-card.component';

describe('MessagesUserCardComponent', () => {
  let component: MessagesUserCardComponent;
  let fixture: ComponentFixture<MessagesUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
