import {Component} from '@angular/core';
import {SocialNavigationComponent} from "../../../components/social-navigation/social-navigation.component";
import {User} from "../../../../architecture/model/User";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {FriendRequest} from "../../../../architecture/model/FriendRequest";
import {Router} from "@angular/router";
import {GroupService} from "../../../../architecture/io/services/GroupService";
import {GroupCardComponent} from "../../../components/social-cards/group-card/group-card.component";

@Component({
    selector: 'app-groups',
    imports: [
        SocialNavigationComponent,
        GroupCardComponent
    ],
    templateUrl: './groups.component.html',
    styleUrl: '../social.component.css'
})
export class GroupsComponent {
    protected user: User | null = null;
    protected groups: string[] = [];

    constructor(
        private serviceFactory: ServiceFactory,
        private router: Router
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => {
            this.user = res;
            (this.serviceFactory.get('group') as GroupService).groupsOf(this.user?.id!).subscribe(res => {
                this.groups = [...res].map(g => g.id!)
            });
        });
    }

    protected showGroupCreationForm() {
        this.router.navigate(['group_creation']).then();
    }
}
