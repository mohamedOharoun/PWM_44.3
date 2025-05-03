import {Component, Input} from '@angular/core';
import { Event } from '../../../../architecture/model/Event';
import {FirebaseEventService} from '../../../io/services/FirebaseEventService';
import {ServiceFactory} from '../../../services/service-factory.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-card-profile',
  imports: [
    DatePipe
  ],
  templateUrl: './event-card-profile.component.html',
  styleUrl: './event-card-profile.component.css'
})
export class EventCardProfileComponent {
  @Input() event!: Event;

  participantsIcon = 'icons/participant_icon.svg'
  timeIcon = 'icons/clock_icon.svg'
  locationIcon = 'icons/location_icon.svg'

  events: Event[] = [];

  private eventService: FirebaseEventService;

  constructor(private serviceFactory: ServiceFactory) {
    this.eventService = this.serviceFactory.get('event') as FirebaseEventService;
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.slice(0, 3);
    })
  }

  get participantsNumber(): string {
    const count = this.event?.members?.length || 0;
    return count > 99 ? '+99' : `${count}`;
  }
}
