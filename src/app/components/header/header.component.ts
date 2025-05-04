import {Component, Input} from '@angular/core';
import {GenericButtonComponent} from "../generic-button/generic-button.component";
import {Router, RouterLink} from "@angular/router";
import {ServiceFactory} from "../../services/service-factory.service";
import {User} from "../../../architecture/model/User";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
    navLinks: { page: string; route: string | null, param?: string }[] = [
        {page: 'Home', route: '/homePage'},
        {page: 'Events', route: '/events', param: 'Explore'},
        {page: 'Social', route: '/social'},
        {page: 'Messages', route: '/messages'},
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

    navigateTo(route: { page: string; route: string | null, param?: string }) {
        if (!route.param) this.router.navigate([route.route]).then();
        else this.router.navigate([route.route, route.param]).then();
        if (this.isMenuOpened) this.toggleMenu();
    }

    toggleMenu() {
        this.isMenuOpened = !this.isMenuOpened;
        document.querySelector('.page-header')!.classList.toggle('page-header-opened');
        document.querySelector('.header-navigation')!.classList.toggle('header-navigation-opened');
    }

    protected async signOut() {
        await (this.serviceFactory.get('auth') as AuthenticationService).signOut();
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => console.log(res));
        this.router.navigate(['/']).then();
    }
}

