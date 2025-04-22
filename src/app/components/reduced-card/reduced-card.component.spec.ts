import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducedCardComponent } from './reduced-card.component';

describe('ReducedCardComponent', () => {
  let component: ReducedCardComponent;
  let fixture: ComponentFixture<ReducedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReducedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReducedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
