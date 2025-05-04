
import {Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {User} from '../../../architecture/model/User';
import {UsersListComponent} from "../users-list/users-list.component";
import {ServiceFactory} from "../../services/service-factory.service";
import {UserService} from "../../../architecture/io/services/UserService";
import {EventService} from "../../../architecture/io/services/EventService";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

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
    @Input() eventID!: string;
    @Output() closeEmitter = new EventEmitter();
    protected members: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['eventID'] && this.eventID.length > 0) {
            (this.serviceFactory.get('event') as EventService).eventWith(this.eventID).subscribe(res => this.members = [...res.members]);
        }
    }

    close() {
        this.closeEmitter.emit();
    }
}
