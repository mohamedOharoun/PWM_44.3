import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FriendRequest} from "../../../../architecture/model/FriendRequest";
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";

@Component({
    selector: 'app-pending-card',
    imports: [],
    templateUrl: './pending-card.component.html',
    styleUrl: '../social-cards.css'
})
export class PendingCardComponent {
    @Input() pendingID!: string;
    @Input() userID!: string;
    @Output() acceptRequestEmitter = new EventEmitter<FriendRequest>();
    @Output() cancelRequestEmitter = new EventEmitter<FriendRequest>();

    protected request!: FriendRequest;
    protected pendingUser!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).pendingTo(this.userID, this.pendingID).subscribe(res => {
            this.request = res;
            (this.serviceFactory.get('user') as UserService).userWith(res.from).subscribe(res => this.pendingUser = res);
        });
    }

    protected acceptRequest() {
        this.acceptRequestEmitter.emit(this.request);
    }

    protected cancelRequest() {
        this.cancelRequestEmitter.emit(this.request);
    }
}
