import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {SentRequestCardComponent} from "../../../components/social-cards/sent-request-card/sent-request-card.component";
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {FriendRequest} from "../../../../architecture/model/FriendRequest";
import {PendingCardComponent} from "../../../components/social-cards/pending-card/pending-card.component";

@Component({
    selector: 'app-pending',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SocialNavigationComponent,
        SentRequestCardComponent,
        PendingCardComponent
    ],
    templateUrl: './pending.component.html',
    styleUrl: './pending.component.css'
})
export class PendingComponent {
    protected user: User | null = null;
    protected pending: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory
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
}
