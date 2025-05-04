import {Component, Input} from '@angular/core';
import {Event} from '../../../architecture/model/Event';

@Component({
  selector: 'app-card-event-home',
  imports: [],
  templateUrl: './card-event-home.component.html',
  styleUrl: './card-event-home.component.css'
})
export class CardEventHomeComponent {

  @Input() type: string = '';
  @Input() event!: Event;

  formatEventDate(date: any): string {
    const eventDate = new Date(date.seconds * 1000);
    const weekday = eventDate.toLocaleDateString('en-US', {weekday: 'short'});
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = eventDate.toLocaleDateString('en-US', {month: 'long'});
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');

    return `${weekday} ${day}, ${month} ${hours}:${minutes}`;

  }
}
