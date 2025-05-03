import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {Router} from "@angular/router";
import {SignUpFirstFormComponent} from "../../../components/forms/sign-up-first-form/sign-up-first-form.component";

@Component({
    selector: 'app-sign-up-first',
    imports: [
        FormStepperComponent,
        SignUpFirstFormComponent
    ],
    templateUrl: './sign-up-first.component.html',
    styleUrl: '../sign-up.css'
})
export class SignUpFirstComponent {
    @ViewChild(SignUpFirstFormComponent) form!: SignUpFirstFormComponent;
    protected currentStep: number = 1;

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
