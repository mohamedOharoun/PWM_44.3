import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";
import {remove} from "@angular/fire/database";

@Component({
    selector: 'app-user-card',
    imports: [],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent {
    @Input() userID!: string;
    @Input() disableIcons: boolean = false;
    @Output() removeEmitter = new EventEmitter<string>();
    protected user!: User;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
    }

    remove() {
        this.removeEmitter.emit(this.userID);
    }
}
