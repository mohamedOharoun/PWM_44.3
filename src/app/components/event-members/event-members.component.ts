import {Component, Input} from '@angular/core';
import {UserCardComponent} from "../users-list/user-card/user-card.component";
import {User} from '../../model/User';
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
    selector: 'app-event-members',
    imports: [
        UsersListComponent
    ],
    templateUrl: './event-members.component.html',
    styleUrl: './event-members.component.css'
})
export class EventMembersComponent {
    @Input() isVisible: boolean = true;
    @Input() members: User[] = [
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

    close() {
        this.isVisible = false;
    }
}
