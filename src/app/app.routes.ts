import { Routes } from '@angular/router';
import {SignUpFirstComponent} from "./pages/sign-up-pages/sign-up-first/sign-up-first.component";
import {SignUpSecondComponent} from "./pages/sign-up-pages/sign-up-second/sign-up-second.component";
import {SignUpThirdComponent} from "./pages/sign-up-pages/sign-up-third/sign-up-third.component";
import {SignUpFourthComponent} from "./pages/sign-up-pages/sign-up-fourth/sign-up-fourth.component";
import {GroupCreationComponent} from "./pages/group-creation/group-creation.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {AlertComponent} from "./components/alert/alert.component";
import {EventMembersComponent} from "./components/event-members/event-members.component";
import {FriendsComponent} from "./pages/social/friends/friends.component";
import {PendingComponent} from "./pages/social/pending/pending.component";
import {SentRequestsComponent} from "./pages/social/sent-requests/sent-requests.component";
import {BlockedComponent} from "./pages/social/blocked/blocked.component";
import {GroupsComponent} from "./pages/social/groups/groups.component";
import {SocialComponent} from "./pages/social/social.component";

export const routes: Routes = [
    {path: 'social', component: SocialComponent},
    {path: 'social/friends', component: FriendsComponent},
    {path: 'social/pending', component: PendingComponent},
    {path: 'social/sent_requests', component: SentRequestsComponent},
    {path: 'social/blocked', component: BlockedComponent},
    {path: 'social/groups', component: GroupsComponent},
    {path: 'signUpFirst', component: SignUpFirstComponent},
    {path: 'signUpSecond', component: SignUpSecondComponent},
    {path: 'signUpThird', component: SignUpThirdComponent},
    {path: 'signUpFourth', component: SignUpFourthComponent},
    {path: 'groupCreation', component: GroupCreationComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'alert', component: AlertComponent},
    {path: 'members', component: EventMembersComponent},
];
