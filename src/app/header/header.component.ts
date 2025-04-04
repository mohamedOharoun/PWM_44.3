import {Component, Input} from '@angular/core';
import {GenericButtonComponent} from "../generic-button/generic-button.component";

@Component({
    selector: 'app-header',
    imports: [
        GenericButtonComponent
    ],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    navLinks: { page: string; route: string | null }[] = [
        {page: 'Home', route: null},
        {page: 'Events', route: null},
        {page: 'Social', route: null},
        {page: 'Messages', route: null},
    ];
    @Input() buttonText: string = "Log in";

    constructor() {
    }
}
