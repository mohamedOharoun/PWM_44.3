import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedCardComponent } from './blocked-card.component';

describe('BlockedCardComponent', () => {
  let component: BlockedCardComponent;
  let fixture: ComponentFixture<BlockedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
