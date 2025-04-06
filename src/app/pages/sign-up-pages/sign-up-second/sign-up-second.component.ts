import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {Router} from "@angular/router";
import {SignUpSecondFormComponent} from "./sign-up-second-form/sign-up-second-form.component";

@Component({
    selector: 'app-sign-up-second',
    imports: [
        FormStepperComponent,
        GenericButtonComponent,
        SignUpSecondFormComponent
    ],
    templateUrl: './sign-up-second.component.html',
    styleUrl: '../sign-up.css'
})
export class SignUpSecondComponent {
    @ViewChild(SignUpSecondFormComponent) form!: SignUpSecondFormComponent;
    protected currentStep: number = 2;
    protected previousStep: { step: number; route: string; text: String } = {
        step: 1,
        route: 'signUpFirst',
        text: ''
    };
    protected nextStep: { step: number; route: string; text: String } = {
        step: 3,
        route: 'signUpThird',
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
