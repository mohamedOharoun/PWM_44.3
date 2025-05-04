import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventHomeComponent } from './card-event-home.component';

describe('CardEventHomeComponent', () => {
  let component: CardEventHomeComponent;
  let fixture: ComponentFixture<CardEventHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEventHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
