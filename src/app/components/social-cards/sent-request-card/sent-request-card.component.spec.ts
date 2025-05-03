import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestCardComponent } from './sent-request-card.component';

describe('SentRequestCardComponent', () => {
  let component: SentRequestCardComponent;
  let fixture: ComponentFixture<SentRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
