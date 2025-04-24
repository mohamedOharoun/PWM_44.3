import { Component } from '@angular/core';
import {UsersListComponent} from '../../../../components/users-list/users-list.component';
import {User} from '../../../../model/User';

@Component({
  selector: 'app-event-creation-second-form',
  imports: [
    UsersListComponent
  ],
  templateUrl: './event-creation-second-form.component.html',
  styleUrl: './event-creation-second-form.component.css'
})
export class EventCreationSecondFormComponent {
  protected members: User[] = [
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    }
  ]
}
