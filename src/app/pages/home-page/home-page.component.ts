import {Component} from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
    imports: [
        GenericButtonComponent,
        RouterLink
    ],
  templateUrl: './home-page.component.html',
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
}
