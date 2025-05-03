import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";

@Component({
    selector: 'app-blocked-card',
    imports: [],
    templateUrl: './blocked-card.component.html',
    styleUrl: '../social-cards.css'
})
export class BlockedCardComponent {
    @Input() userID!: string;
    @Output() unblockEmitter = new EventEmitter<string>();

    protected user!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
    }

    protected unblockUser() {
        this.unblockEmitter.emit(this.userID);
    }
}
