import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";

@Component({
    selector: 'app-friend-card',
    imports: [],
    templateUrl: './friend-card.component.html',
    styleUrl: '../social-cards.css'
})
export class FriendCardComponent {
    @Input() userID!: string;
    @Output() blockEmitter = new EventEmitter<string>();
    @Output() removeEmitter = new EventEmitter<string>();
    @Output() chatWithEmitter = new EventEmitter<string>();

    protected user!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
    }

    protected blockUser() {
        this.blockEmitter.emit(this.userID);
    }

    protected removeUser() {
        this.removeEmitter.emit(this.userID);
    }

    protected chatWithUser() {
        this.chatWithEmitter.emit(this.userID);
    }
}
