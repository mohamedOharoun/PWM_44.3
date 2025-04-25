import {Component} from '@angular/core';
import {FeatureInfoComponent} from './feature-info/feature-info.component';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [
    FeatureInfoComponent,
    GenericButtonComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  indexTitle = 'Welcome to JoinUp!';
  introduction = `JoinUp! is your platform to connect and discover unique events! Whether you're organizing an event or looking for something that interests you, we're here to make it happen. Ready to join the fun?`;
  mainButtonText = 'Get started';
  seeMoreText = 'See more';
  mainPhoto = '/icons/index_background.png';
  features = [
    {
      image: '/icons/high_five.gif',
      title: 'Add your friends',
      description: 'With the new update, now you are able to add your friends and be in touch with them!',
    },
    {
      image: '/icons/search.gif',
      title: 'Explore events',
      description: 'No friends to meet up with? Don’t worry, search for new people by joining nearby events!',
    },
    {
      image: '/icons/credit_card.gif',
      title: 'Split your payments',
      description: 'Meet up with your friends at a paid event, sharing in equals parts the price.',
    },
  ];

  scrollToFeatures(event: Event) {
    event.preventDefault();
    const target = document.querySelector('#features-info-section');
    target?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
