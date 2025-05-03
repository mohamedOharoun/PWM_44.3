import {Component} from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {RouterLink} from "@angular/router";
import {User} from '../../../architecture/model/User';
import {Event} from '../../../architecture/model/Event';

@Component({
  selector: 'app-home-page',
    imports: [
        GenericButtonComponent,
        RouterLink,
    ],
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  title = 'Welcome to JoinUp!';
  textInfo= `Meet people. Explore events. Join groups.`;
  photo = "/icons/home_icon.png"
  firstButton = 'Create event';
  secondButton = 'Create group';
  friendsContainer = "Friends Online";
  eventsContainer = "Upcoming events";
  paymentsContainer = "Pending payments";

  onlineFriends: User[] = [];
  upcomingEvents: Event[] = [];
  unpaidEvents: Event[] = [];

  ngOnInit() {
    const sampleCreator: User = {
      id: '123',
      email: 'user@example.com',
      name: 'John Doe',
      username: 'johndoe',
      description: 'Event organizer',
      image: 'profile.jpg'
    };

    this.unpaidEvents = [
      {
        name: 'Concert',
        description: 'Live music event',
        date: new Date('2025-05-15'),
        location: 'Central Park',
        creator: sampleCreator,
        tags: ['music', 'outdoor'],
        members: [sampleCreator],
        likes: 24,
        comments: 5
      }
    ];

    this.onlineFriends = [sampleCreator];

    this.upcomingEvents = [
      {
        name: 'Concert',
        description: 'Live music event',
        date: new Date(2025, 4, 15, 21, 0),
        location: 'Central Park',
        creator: sampleCreator,
        tags: ['music', 'outdoor'],
        members: [sampleCreator],
        likes: 24,
        comments: 5
      }
    ]
  }

  formatEventDate(date: Date): string {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${weekday} ${day}, ${month} ${hours}:${minutes}`;
  }


}
