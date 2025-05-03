import {Component, Input} from '@angular/core';
import {GenericButtonComponent} from "../generic-button/generic-button.component";
import {Router, RouterLink} from "@angular/router";
import {ServiceFactory} from "../../services/service-factory.service";
import {User} from "../../../architecture/model/User";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {signOut} from "@angular/fire/auth";

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
        {page: 'Home', route: 'homePage'},
        {page: 'Events', route: null},
        {page: 'Social', route: 'social/blocked'},
        {page: 'Messages', route: 'messages'},
    ];
    @Input() buttonText: string = "Sign in";
    private isMenuOpened: boolean = false;
    protected user: User | null = null;

    constructor(
        private serviceFactory: ServiceFactory,
        private router: Router
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => this.user = res);
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

    protected signOut() {
        (this.serviceFactory.get('auth') as AuthenticationService).signOut();
        this.router.navigate(['homePage']).then();
    }
}

