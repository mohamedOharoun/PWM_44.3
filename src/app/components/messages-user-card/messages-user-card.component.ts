import {Component, Input} from '@angular/core';
import {User} from "../../../architecture/model/User";
import {Service} from "../../../architecture/io/services/Service";
import {ServiceFactory} from "../../services/service-factory.service";
import {UserService} from "../../../architecture/io/services/UserService";

@Component({
    selector: 'app-messages-user-card',
    imports: [],
    templateUrl: './messages-user-card.component.html',
    standalone: true,
    styleUrl: './messages-user-card.component.css'
})
export class MessagesUserCardComponent {
    @Input() userID!: string;

    protected user!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
    }
}
