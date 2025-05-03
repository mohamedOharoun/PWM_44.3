import {Component} from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {Router, RouterLink} from "@angular/router";
import {User} from '../../../architecture/model/User';
import {Event} from '../../../architecture/model/Event';
import {AuthenticationService} from '../../../architecture/io/services/AuthenticationService';
import {UserService} from '../../../architecture/io/services/UserService';
import {ServiceFactory} from '../../services/service-factory.service';
import {CardHomeComponent} from '../../components/card-home/card-home.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GenericButtonComponent,
    RouterLink,
    CardHomeComponent,
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

  upcomingEvents: Event[] = [];
  unpaidEvents: Event[] = [];

  protected user: User | null = null;
  protected friends: string[] = [];

  constructor(
    private serviceFactory: ServiceFactory
  ) {
  }

  ngOnInit() {
    (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
      this.user = res;
      (this.serviceFactory.get('user') as UserService).friendsOf(this.user?.id!).subscribe(res => {
        const shuffled = res.sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * 5);
        this.friends = shuffled.slice(0, count);
      });
    });
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
