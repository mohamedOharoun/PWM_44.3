import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";
import {FriendRequest} from "../../../../architecture/model/FriendRequest";

@Component({
    selector: 'app-sent-request-card',
    imports: [],
    templateUrl: './sent-request-card.component.html',
    styleUrl: '../social-cards.css'
})
export class SentRequestCardComponent {
    @Input() requestID!: string;
    @Input() userID!: string;
    @Output() cancelRequestEmitter = new EventEmitter<FriendRequest>();

    protected request!: FriendRequest;
    protected requestUser!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).requestFrom(this.userID, this.requestID).subscribe(res => {
            this.request = res;
            (this.serviceFactory.get('user') as UserService).userWith(res.to).subscribe(res => this.requestUser = res);
        });
    }

    protected cancelRequest() {
        this.cancelRequestEmitter.emit(this.request);
    }
}
