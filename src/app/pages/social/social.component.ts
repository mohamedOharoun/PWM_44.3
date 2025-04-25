import {Component} from '@angular/core';
import {SocialCard} from "../../../architecture/model/SocialCard";
import {SocialCardComponent} from "./social-card/social-card.component";
import {HeaderComponent} from "../../components/header/header.component";
import {ActivatedRoute} from "@angular/router";
import {ServiceFactory} from "../../services/service-factory.service";
import {User} from "../../../architecture/model/User";
import {UserService} from "../../../architecture/io/services/UserService";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
    protected cards: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
            console.log((this.serviceFactory.get('auth') as AuthenticationService).getLoggedUserUID()!)
        this.route.queryParams.subscribe(params => {
            this.currentSocialCategory = params['socialCategory'];
            (this.serviceFactory.get('user') as UserService)
                .userWith(
                    (this.serviceFactory.get('auth') as AuthenticationService).getLoggedUserUID()!
                ).subscribe(res => {
                this.user = res;
                this.cards = this.user.friends;
                console.log(this.cards)
            });
        });

    }
}
