import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceFactory} from "../../../services/service-factory.service";
import {User} from '../../../../architecture/model/User';
import {UserService} from "../../../../architecture/io/services/UserService";

@Component({
    selector: 'app-user-card',
    imports: [],
    templateUrl: './user-card.component.html',
    styleUrl: '../social-cards.css'
})
export class UserCardComponent {
    @Input() userID!: string;
    @Output() addEmitter = new EventEmitter<string>();

    protected user!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
    }

    protected addUser() {
        this.addEmitter.emit(this.userID);
    }
}
