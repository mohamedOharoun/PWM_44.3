import {Component} from '@angular/core';
import {SocialCardComponent} from "../../../components/social-card/social-card.component";
import {PendingCardComponent} from "../../../components/social-cards/pending-card/pending-card.component";
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {FriendRequest} from "../../../../architecture/model/FriendRequest";
import {Router} from "@angular/router";

@Component({
    selector: 'app-groups',
    imports: [
        PendingCardComponent,
        SocialNavigationComponent
    ],
    templateUrl: './groups.component.html',
    styleUrl: './groups.component.css'
})
export class GroupsComponent {
    protected user: User | null = null;
    protected pending: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory,
        private router: Router
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('user') as UserService).pendingOf(this.user?.id!).subscribe(res => this.pending = [...res]);
        });
    }

    acceptRequest(request: FriendRequest) {
        (this.serviceFactory.get('user') as UserService).acceptRequest(request);
    }

    cancelRequest(request: FriendRequest) {
        (this.serviceFactory.get('user') as UserService).cancelRequest(request);
    }

    protected showGroupCreationForm() {
        this.router.navigate(['group_creation']).then();
    }
}
