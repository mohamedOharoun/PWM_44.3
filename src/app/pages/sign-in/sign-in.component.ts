import {Component} from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {Router, RouterLink} from '@angular/router';
import {ServiceFactory} from "../../services/service-factory.service";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-sign-in',
    imports: [
        GenericButtonComponent,
        RouterLink,
        FormsModule
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    protected email: string = "";
    protected password: string = "";

    constructor(
        private serviceFactory: ServiceFactory,
        private router: Router
    ) {
    }

    protected signIn() {
        (this.serviceFactory.get('auth') as AuthenticationService).signIn(this.email, this.password);
        this.router.navigate(['/homePage']).then();
    }
}
