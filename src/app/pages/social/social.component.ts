import {Component} from '@angular/core';
import {SocialCard} from "../../../architecture/model/SocialCard";
import {SocialCardComponent} from "./social-card/social-card.component";
import {HeaderComponent} from "../../components/header/header.component";

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
    protected socialCards: SocialCard[] = [
    ];
    navLinks: string[] = [
        "Friends",
        "Pending",
        "Sent requests",
        "Blocked",
        "Groups",
    ];
}
