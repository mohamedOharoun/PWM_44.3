import {
    CanActivate,
    Router
} from '@angular/router';
import {Injectable} from "@angular/core";
import {ServiceFactory} from "../services/service-factory.service";
import {User} from "../../architecture/model/User";
import {AuthenticationService} from "../../architecture/io/services/AuthenticationService";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private user: User | null = null;

    constructor(
        private router: Router,
        private serviceFactory: ServiceFactory
    ) {
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(res => this.user = res);
    }

    canActivate(): boolean {
        if (!this.user) {
            this.router.navigate(['/signin']).then();
            return false;
        }
        else return true;
    }
}
