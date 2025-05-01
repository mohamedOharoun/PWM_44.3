import {Component, ElementRef, ViewChild} from '@angular/core';
import {SocialCard} from "../../../architecture/model/SocialCard";
import {SocialCardComponent} from "../../components/social-card/social-card.component";
import {ActivatedRoute} from "@angular/router";
import {ServiceFactory} from "../../services/service-factory.service";
import {User} from "../../../architecture/model/User";
import {UserService} from "../../../architecture/io/services/UserService";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";

@Component({
    selector: 'app-social',
    imports: [
        SocialCardComponent
    ],
    templateUrl: './social.component.html',
    standalone: true,
    styleUrl: './social.component.css'
})
export class SocialComponent {
    protected socialCards: SocialCard[] = [];
    protected navLinks: string[] = [
        "Friends",
        "Pending",
        "Sent requests",
        "Blocked",
        "Groups",
    ];
    protected currentSocialCategory: string = "friends";
    protected user: User | null = null;

    constructor(
        private route: ActivatedRoute,
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.currentSocialCategory = params['socialCategory'];
            (this.serviceFactory.get('auth') as AuthenticationService).user$.subscribe(res => {
                this.user = res;
                (this.serviceFactory.get('user') as UserService).friendsOf(this.user!.id!).subscribe(res => this.socialCards = res!.map(u => this.toSocialCard(u)));
            });
        });
    }

    private toSocialCard(user: User): SocialCard {
        return {
            comments: 0,
            creator: user,
            icons: [],
            image: "https://picsum.photos/200",
            likes: 0,
            members: [],
            text: user.username
        }
    }
}
