import { Component } from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {InputWithIconComponent} from "../../../components/input-with-icon/input-with-icon.component";

@Component({
  selector: 'app-sign-up-second',
  imports: [
    FormStepperComponent,
    GenericButtonComponent,
    InputWithIconComponent
  ],
  templateUrl: './sign-up-second.component.html',
  styleUrl: '../sign-up.css'
})
export class SignUpSecondComponent {

}
