import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../../architecture/io/services/UserService";
import {ServiceFactory} from "../../services/service-factory.service";
import {InputComponent} from "../input/input.component";
import {User} from "../../../architecture/model/User";

@Component({
    selector: 'app-users-search-input',
    imports: [
        InputComponent
    ],
    templateUrl: './users-search-input.component.html',
    styleUrl: './users-search-input.component.css'
})
export class UsersSearchInputComponent {
    @Input() exclude: string[] = [];
    @Output() selectedEmitter = new EventEmitter<string>;
    protected searchedUsers: User[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    protected searchCoincidencesUsers(name: string) {
        if (name && name.length > 0) (this.serviceFactory.get('user') as UserService).userNamed(name).subscribe(res => this.searchedUsers = [...res].filter(u => !this.exclude.includes(u.id!)));
        else this.searchedUsers = [];
    }

    selectUser(id: string) {
        this.selectedEmitter.emit(id);
        this.searchedUsers = this.searchedUsers.filter(u => u.id !== id);
    }
}
