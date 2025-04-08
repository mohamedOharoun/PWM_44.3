import {Component, Input} from '@angular/core';
import {GenericButtonComponent} from "../generic-button/generic-button.component";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-header',
    imports: [
        GenericButtonComponent,
        RouterLink
    ],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    navLinks: { page: string; route: string | null }[] = [
        {page: 'Home', route: null},
        {page: 'Events', route: null},
        {page: 'Social', route: 'social'},
        {page: 'Messages', route: 'messages'},
    ];
    @Input() buttonText: string = "Sign in";
    private isMenuOpened: boolean = false;

    constructor(private router: Router) {
    }

    navigateTo(route: string | null) {
        this.router.navigate([route]).then();
        if (this.isMenuOpened) this.toggleMenu();
    }

    toggleMenu() {
        this.isMenuOpened = !this.isMenuOpened;
        document.querySelector('.page-header')!.classList.toggle('page-header-opened');
        document.querySelector('.header-navigation')!.classList.toggle('header-navigation-opened');
    }
}

