import {Component, Input} from '@angular/core';
import { Event } from '../../../../architecture/model/Event';

@Component({
  selector: 'app-event-card-profile',
  templateUrl: './event-card-profile.component.html',
  styleUrl: './event-card-profile.component.css'
})
export class EventCardProfileComponent {
  @Input() event!: Event;

  participantsIcon = 'icons/participants_icon.svg'
  timeIcon = 'icons/clock_icon.svg'
  locationIcon = 'icons/location_icon.svg'

  get participantsNumber(): string {
    const count = this.event?.members?.length || 0;
    return count > 99 ? '+99' : `${count}`;
  }

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
