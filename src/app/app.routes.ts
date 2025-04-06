import { Routes } from '@angular/router';
import {SocialComponent} from "./pages/social/social.component";
import {SignUpComponent} from "./pages/sign-up-pages/sign-up/sign-up.component";
import {SignUpSecondComponent} from "./pages/sign-up-pages/sign-up-second/sign-up-second.component";

export const routes: Routes = [
    {path: 'social', component: SocialComponent},
    {path: 'signUpFirst', component: SignUpComponent},
    {path: 'signUpSecond', component: SignUpSecondComponent}
];
