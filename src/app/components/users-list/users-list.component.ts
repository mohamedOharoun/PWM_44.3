import {Component, Input} from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import {User} from "../../model/User";

@Component({
    selector: 'app-users-list',
    imports: [
        UserCardComponent
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css'
})
export class UsersListComponent {
    @Input() users: User[] = [];
}
