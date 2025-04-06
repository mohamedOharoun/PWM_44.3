import { Component } from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {InputWithIconComponent} from "../../../components/input-with-icon/input-with-icon.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  imports: [
    FormStepperComponent,
    InputWithIconComponent,
    GenericButtonComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: '../sign-up.css'
})
export class SignUpComponent {

}
