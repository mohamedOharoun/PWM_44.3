import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import {User} from "../../../architecture/model/User";
import {ServiceFactory} from "../../services/service-factory.service";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";

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
    @Output() removeEmitter = new EventEmitter<string>();
    protected loggedUserID: string = '';

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => this.loggedUserID = res?.id!);
    }

    remove(id: string) {
        this.removeEmitter.emit(id);
    }
}
