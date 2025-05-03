import { Component } from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [
    GenericButtonComponent,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

}
