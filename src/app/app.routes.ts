import { Routes } from '@angular/router';
import {SocialComponent} from "./pages/social/social.component";
import {SignUpFirstComponent} from "./pages/sign-up-pages/sign-up-first/sign-up-first.component";
import {SignUpSecondComponent} from "./pages/sign-up-pages/sign-up-second/sign-up-second.component";
import {SignUpThirdComponent} from "./pages/sign-up-pages/sign-up-third/sign-up-third.component";
import {SignUpFourthComponent} from "./pages/sign-up-pages/sign-up-fourth/sign-up-fourth.component";
import {GroupCreationComponent} from "./pages/group-creation/group-creation.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {EventMembersComponent} from "./components/event-members/event-members.component";
import {FriendsComponent} from "./pages/social/friends/friends.component";
import {PendingComponent} from "./pages/social/pending/pending.component";
import {SentRequestsComponent} from "./pages/social/sent-requests/sent-requests.component";
import {BlockedComponent} from "./pages/social/blocked/blocked.component";
import {GroupsComponent} from "./pages/social/groups/groups.component";
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthGuard} from "./guards/auth.guard";
import {ProfilePageUserComponent} from "./pages/profile-page-user/profile-page-user.component";
import {PrivacyPolicyComponent} from "./pages/privacy-policy/privacy-policy.component";
import {
    EventCreationFirstComponent
} from "./pages/event-creation-pages/event-creation-first/event-creation-first.component";
import {
    EventCreationSecondComponent
} from "./pages/event-creation-pages/event-creation-second/event-creation-second.component";
import {
    EventCreationThirdComponent
} from "./pages/event-creation-pages/event-creation-third/event-creation-third.component";

export const routes: Routes = [
    {path: 'social', component: SocialComponent, canActivate: [AuthGuard]},
    {path: 'social/friends', component: FriendsComponent, canActivate: [AuthGuard]},
    {path: 'social/pending', component: PendingComponent, canActivate: [AuthGuard]},
    {path: 'social/sent_requests', component: SentRequestsComponent, canActivate: [AuthGuard]},
    {path: 'social/blocked', component: BlockedComponent, canActivate: [AuthGuard]},
    {path: 'social/groups', component: GroupsComponent, canActivate: [AuthGuard]},
    {path: 'signUpFirst', component: SignUpFirstComponent},
    {path: 'signUpSecond', component: SignUpSecondComponent},
    {path: 'signUpThird', component: SignUpThirdComponent},
    {path: 'signUpFourth', component: SignUpFourthComponent},
    {path: 'group_creation', component: GroupCreationComponent, canActivate: [AuthGuard]},
    {path: 'signin', component: SignInComponent},
    {path: 'resetPassword', component: ResetPasswordComponent},
    {path: '', component: LandingPageComponent},
    {path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'eventCreationFirst', component: EventCreationFirstComponent, canActivate: [AuthGuard]},
    {path: 'eventCreationSecond', component: EventCreationSecondComponent, canActivate: [AuthGuard]},
    {path: 'eventCreationThird', component: EventCreationThirdComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfilePageUserComponent, canActivate: [AuthGuard]},
    {path: 'privacyPolicy', component: PrivacyPolicyComponent},
    {path: 'groupCreation', component: GroupCreationComponent, canActivate: [AuthGuard]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: 'members', component: EventMembersComponent, canActivate: [AuthGuard]}
];
