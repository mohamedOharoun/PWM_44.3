import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ServiceFactory} from "./services/service-factory.service";
import {FirebaseAuthenticationService} from "./io/services/FirebaseAuthenticationService";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {FirebaseUserService} from "./io/services/FirebaseUserService";
import {FirebaseMessageService} from "./io/services/FirebaseMessageService";
import {FooterComponent} from './components/footer/footer.component';
import {FirebaseEventService} from "./io/services/FirebaseEventService";
import {FirebaseGroupService} from "./io/services/FirebaseGroupService";

@Component({
    selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'join_up';

    constructor(
        private serviceFactory: ServiceFactory,
        private auth: Auth,
        private fireStore: Firestore
    ) {
    }

    ngOnInit() {
        this.fillServiceFactory();
    }

    private fillServiceFactory() {
        this.serviceFactory
            .put('auth', new FirebaseAuthenticationService(this.auth, this.fireStore))
            .put('user', new FirebaseUserService(this.fireStore))
            .put('message', new FirebaseMessageService(this.fireStore))
            .put('event', new FirebaseEventService(this.fireStore))
            .put('group', new FirebaseGroupService(this.fireStore))
    }
}
