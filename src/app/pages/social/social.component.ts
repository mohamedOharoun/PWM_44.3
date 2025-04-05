import {Component} from '@angular/core';
import {SocialCard} from "../../model/SocialCard";
import {SocialCardComponent} from "./social-card/social-card.component";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
    selector: 'app-social',
    imports: [
        SocialCardComponent,
        HeaderComponent
    ],
    templateUrl: './social.component.html',
    standalone: true,
    styleUrl: './social.component.css'
})
export class SocialComponent {
    protected socialCards: SocialCard[] = [
        {
            image: "",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },{
            image: "",
            text: "Hi",
            icons: [""]
        },{
            image: "icons/logo.svg",
            text: "Hi",
            icons: [""]
        },
        {
            image: "",
            text: "Hi",
            icons: [""]
        },{
            image: "",
            text: "Hi",
            icons: [""]
        },{
            image: "",
            text: "Hi",
            icons: [""]
        },{
            image: "",
            text: "Hi",
            icons: [""]
        }






    ];
    navLinks: string[] = [
        "Friends",
        "Pending",
        "Sent requests",
        "Blocked",
        "Groups",
    ];
}
