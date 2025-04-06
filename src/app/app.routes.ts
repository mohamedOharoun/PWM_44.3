import { Routes } from '@angular/router';
import {SocialComponent} from "./pages/social/social.component";
import {SignUpComponent} from "./pages/sign-up-pages/sign-up/sign-up.component";
import {SignUpSecondComponent} from "./pages/sign-up-pages/sign-up-second/sign-up-second.component";
import {SignUpThirdComponent} from "./pages/sign-up-pages/sign-up-third/sign-up-third.component";
import {SignUpFourthComponent} from "./pages/sign-up-pages/sign-up-fourth/sign-up-fourth.component";

export const routes: Routes = [
    {path: 'social', component: SocialComponent},
    {path: 'signUpFirst', component: SignUpComponent},
    {path: 'signUpSecond', component: SignUpSecondComponent},
    {path: 'signUpThird', component: SignUpThirdComponent},
    {path: 'signUpFourth', component: SignUpFourthComponent},
];
