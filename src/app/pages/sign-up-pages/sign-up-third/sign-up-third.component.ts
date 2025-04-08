import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SignUpThirdFormComponent} from "./sign-up-third-form/sign-up-third-form.component";
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";

@Component({
    selector: 'app-sign-up-third',
    imports: [
        FormStepperComponent,
        GenericButtonComponent,
        SignUpThirdFormComponent
    ],
    templateUrl: './sign-up-third.component.html',
    styleUrl: '../sign-up.css'
})
export class SignUpThirdComponent {
    @ViewChild(SignUpThirdFormComponent) form!: SignUpThirdFormComponent;
    protected currentStep: number = 3;
    protected previousStep: { step: number; route: string; text: String } = {
        step: 2,
        route: 'signUpSecond',
        text: ''
    };
    protected nextStep: { step: number; route: string; text: String } = {
        step: 4,
        route: 'signUpFourth',
        text: ''
    };

    constructor(private router: Router) {
    }

    protected saveFormData() {
        this.form.saveFormData();
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
