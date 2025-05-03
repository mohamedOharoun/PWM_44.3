import {Component, Input} from '@angular/core';
import {GenericButtonComponent} from '../generic-button/generic-button.component';

@Component({
  selector: 'app-reduced-card',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './reduced-card.component.html',
  styleUrl: './reduced-card.component.css'
})
export class ReducedCardComponent {
  icons = {
    report: 'icons/report_icon.svg',
    share: 'icons/share_icon.svg',

    date: 'icons/clock_icon.svg',
    place: 'icons/location_icon.svg',
    price: 'icons/money_icon.svg',

    like: 'icons/heart_icon.svg',
    square: 'icons/square_message_icon.svg',

    participants: 'icons/participants_icon.svg',
  }

  @Input() eventName = '';
  @Input() eventCreator = '';
  @Input() descriptionTitle = '';
  @Input() descriptionText = '';
  @Input() date = '';
  @Input() place = '';
  @Input() price = '';
  @Input() tags: string[] = [];
  @Input() likes = 0;
  @Input() comments = 0;
  @Input() participants = 0;
  @Input() participantsLabel = '';
}
