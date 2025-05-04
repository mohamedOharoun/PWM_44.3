import {Component, Input} from '@angular/core';
import {User} from '../../../architecture/model/User';
import {UsersListComponent} from "../users-list/users-list.component";
import {ServiceFactory} from "../../services/service-factory.service";
import {UserService} from "../../../architecture/io/services/UserService";

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
    @Input() members: string[] = []

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userNamed("").subscribe(res => this.members = [...res].map(u => u.id!));
    }

    close() {
        this.isVisible = false;
    }
}
