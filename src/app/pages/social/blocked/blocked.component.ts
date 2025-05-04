import {Component} from '@angular/core';
import {SocialCardComponent} from "../../../components/social-card/social-card.component";
import {ServiceFactory} from "../../../services/service-factory.service";
import {User} from "../../../../architecture/model/User";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {UserCardComponent} from "../../../components/social-cards/user-card/user-card.component";
import {BlockedCardComponent} from "../../../components/social-cards/blocked-card/blocked-card.component";

@Component({
    selector: 'app-blocked',
    imports: [
        SocialNavigationComponent,
        BlockedCardComponent
    ],
    templateUrl: './blocked.component.html',
    styleUrl: '../social.component.css'
})
export class BlockedComponent {
    protected user: User | null = null;
    protected blocked: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('user') as UserService).blockedOf(this.user?.id!).subscribe(res => this.blocked = [...res]);
        });
    }

    protected unblockUser(id: string) {
        (this.serviceFactory.get('user') as UserService).unblockUser(this.user?.id!, id);
    }
}
