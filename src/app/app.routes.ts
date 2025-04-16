import { Routes } from '@angular/router';
import {SocialComponent} from "./pages/social/social.component";
import {SignUpFirstComponent} from "./pages/sign-up-pages/sign-up/sign-up-first.component";
import {SignUpSecondComponent} from "./pages/sign-up-pages/sign-up-second/sign-up-second.component";
import {SignUpThirdComponent} from "./pages/sign-up-pages/sign-up-third/sign-up-third.component";
import {SignUpFourthComponent} from "./pages/sign-up-pages/sign-up-fourth/sign-up-fourth.component";
import {ProfilePageUserComponent} from './pages/profile-page-user/profile-page-user.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {GroupCreationComponent} from "./pages/group-creation/group-creation.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {AlertComponent} from "./components/alert/alert.component";
import {EventMembersComponent} from "./components/event-members/event-members.component";

export const routes: Routes = [
    {path: 'social', component: SocialComponent},
    {path: 'signUpFirst', component: SignUpFirstComponent},
    {path: 'signUpSecond', component: SignUpSecondComponent},
    {path: 'signUpThird', component: SignUpThirdComponent},
    {path: 'signUpFourth', component: SignUpFourthComponent},
    {path: 'profile', component: ProfilePageUserComponent},
    {path: 'privacyPolicy', component: PrivacyPolicyComponent},
    {path: 'groupCreation', component: GroupCreationComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'alert', component: AlertComponent},
    {path: 'members', component: EventMembersComponent},
];
