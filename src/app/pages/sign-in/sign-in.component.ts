import { Component } from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
