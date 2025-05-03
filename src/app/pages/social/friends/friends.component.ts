import {Component} from '@angular/core';
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {FriendCardComponent} from "../../../components/social-cards/friend-card/friend-card.component";

@Component({
    selector: 'app-friends',
    imports: [
        SocialNavigationComponent,
        FriendCardComponent
    ],
    templateUrl: './friends.component.html',
    styleUrl: './friends.component.css'
})
export class FriendsComponent {
    protected user: User | null = null;
    protected friends: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('user') as UserService).friendsOf(this.user?.id!).subscribe(res => this.friends = [...res]);
        });
    }

    protected blockUser(id: string) {
        (this.serviceFactory.get('user') as UserService).blockUser(this.user?.id!, id);
    }

    protected removeUser(id: string) {
        (this.serviceFactory.get('user') as UserService).removeUser(this.user?.id!, id);
    }

    protected chatWithUser(id: string) {

    }
}
