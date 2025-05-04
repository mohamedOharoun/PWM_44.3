import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {Router} from "@angular/router";
import {FormService} from "../../../services/form.service";
import {ServiceFactory} from "../../../services/service-factory.service";
import {SignUpFourthFormComponent} from "../../../components/forms/sign-up-fourth-form/sign-up-fourth-form.component";

@Component({
    selector: 'app-sign-up-fourth',
    imports: [
        FormStepperComponent,
        SignUpFourthFormComponent,
    ],
    templateUrl: './sign-up-fourth.component.html',
    standalone: true,
    styleUrl: '../sign-up.css'
})
export class SignUpFourthComponent {
    @ViewChild(SignUpFourthFormComponent) form!: SignUpFourthFormComponent;
    protected currentStep: number = 4;
    protected previousStep: { step: number; route: string; text: String } = {
        step: 3,
        route: 'signUpThird',
        text: ''
    };

    constructor(
        private router: Router
    ) {
    }

    protected saveFormData() {
        this.form.saveFormData();
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
