import {Component, Input} from '@angular/core';
import {User} from "../../../../architecture/model/User";

@Component({
    selector: 'app-user-card',
    imports: [],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent {
    @Input() user!: User;
}
