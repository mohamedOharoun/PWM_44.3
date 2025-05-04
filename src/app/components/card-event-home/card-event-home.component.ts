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

  formatEventDate(date: Date): string {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${weekday} ${day}, ${month} ${hours}:${minutes}`;
  }
}
