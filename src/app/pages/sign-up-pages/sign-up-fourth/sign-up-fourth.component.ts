import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {Router} from "@angular/router";
import {SignUpFourthFormComponent} from "./sign-up-fourth-form/sign-up-fourth-form.component";
import {FirebaseService} from "../../../services/firebase.service";
import {FormService} from "../../../services/form.service";

@Component({
    selector: 'app-sign-up-fourth',
    imports: [
        FormStepperComponent,
        GenericButtonComponent,
        SignUpFourthFormComponent
    ],
    templateUrl: './sign-up-fourth.component.html',
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

    constructor(private router: Router, private formService: FormService, private storage: FirebaseService) {
    }

    createAccount() {
        this.form.saveFormData();
        const signUpInfo: FormService = this.formService.get('signUp');
        this.storage.registerUser(
            signUpInfo.get('email'),
            signUpInfo.get('password'),
            null
        ).then();
    }

    protected saveFormData() {
        this.form.saveFormData();
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
