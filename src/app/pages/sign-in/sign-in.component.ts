import {Component} from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    imports: [
        GenericButtonComponent,
        RouterLink
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
