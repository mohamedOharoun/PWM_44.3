import {Component} from '@angular/core';
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {SentRequestCardComponent} from "../../../components/social-cards/sent-request-card/sent-request-card.component";
import {FriendRequest} from "../../../../architecture/model/FriendRequest";

@Component({
    selector: 'app-sent-requests',
    imports: [
        SocialNavigationComponent,
        SentRequestCardComponent
    ],
    templateUrl: './sent-requests.component.html',
    styleUrl: '../social.component.css'
})
export class SentRequestsComponent {
    protected user: User | null = null;
    protected requests: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('user') as UserService).sentRequestsOf(this.user?.id!).subscribe(res => this.requests = [...res]);
        });
    }

    cancelRequest(request: FriendRequest) {
        (this.serviceFactory.get('user') as UserService).cancelRequest(request);
    }
}
