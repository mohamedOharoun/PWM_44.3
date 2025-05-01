import {Component} from '@angular/core';
import {ServiceFactory} from "../../services/service-factory.service";
import {User} from "../../../architecture/model/User";
import {UserService} from "../../../architecture/io/services/UserService";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {FormsModule} from "@angular/forms";
import {SocialNavigationComponent} from "../../components/social-navigation/social-navigation.component";
import {UserCardComponent} from "../../components/social-cards/user-card/user-card.component";

@Component({
    selector: 'app-social',
    imports: [
        FormsModule,
        SocialNavigationComponent,
        UserCardComponent
    ],
    templateUrl: './social.component.html',
    standalone: true,
    styleUrl: './social.component.css'
})
export class SocialComponent {
    protected users: User[] = [];
    protected user: User | null = null;
    protected friends: string[] = [];
    protected blocked: string[] = [];
    protected requests: string[] = [];
    protected username: string = "";

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('user') as UserService).friendsOf(this.user?.id!).subscribe(res => {
                this.friends = [...res];
                (this.serviceFactory.get('user') as UserService).blockedOf(this.user?.id!).subscribe(res => {
                    this.blocked = [...res];
                    (this.serviceFactory.get('user') as UserService).sentRequestsOf(this.user?.id!).subscribe(res => {
                        this.requests = [...res];
                        this.search();
                    });
                });
            });
        });
    }

    protected search() {
        (this.serviceFactory.get('user') as UserService).userNamed(this.username).subscribe(res => this.users = [...res].filter(u => u.id !== this.user?.id && !this.friends.includes(u.id!) && !this.blocked.includes(u.id!) && !this.requests.includes(u.id!)));
    }

    protected addUser(id: string) {
        (this.serviceFactory.get('user') as UserService).addUser(this.user?.id!, id);
    }
}
