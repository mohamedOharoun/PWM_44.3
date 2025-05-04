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

  @Input() eventName : string = '';
  @Input() eventCreator : string = '';
  @Input() descriptionText : string = '';
  @Input() date : string = '';
  @Input() place : string = '';
  @Input() price : number = 0;
  @Input() tags: string[] = [];
  @Input() likes : number = 0;
  @Input() comments : number = 0;
  @Input() participants : number = 0;

  parseDateTimeLocal(timeStamp? : any) : string {
    const date = new Date(timeStamp ? timeStamp : this.date);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}`;

    return `${dayOfWeek} ${dayOfMonth}, ${month} ${timeString}`;
  }

  priceFormat() : string {
    return (this.price === 0) ? 'FREE' : `$${this.price}`;
  }

  compactNumbers (number : number) {
    if (number <= 999) return number;
    if (number <= 999_999) return Math.floor(number / 1000) + "K";
    return Math.floor(number / 1_000_000) + "M";
  }
}
