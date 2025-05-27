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
        {page: 'Events', route: '/events', param: 'Explore'},
    ];
    @Input() buttonText: string = "Sign in";
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
    }

    protected async signOut() {
        try {
            const auth = this.serviceFactory.get('auth') as AuthenticationService;
            await auth.signOut();
            // Unsubscribe from user updates before navigation
            this.user = null;
            // Force navigation to root and reload the page
            window.location.href = '/';
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }
}

