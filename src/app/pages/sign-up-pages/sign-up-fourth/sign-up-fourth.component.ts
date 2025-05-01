import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from "../../../components/form-stepper/form-stepper.component";
import {GenericButtonComponent} from "../../../components/generic-button/generic-button.component";
import {Router} from "@angular/router";
import {SignUpFourthFormComponent} from "../../../components/forms/sign-up-fourth-form/sign-up-fourth-form.component";
import {FormService} from "../../../services/form.service";
import {ServiceFactory} from "../../../services/service-factory.service";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../../architecture/io/services/UserService";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
    selector: 'app-sign-up-first-fourth',
    imports: [
        FormStepperComponent,
        GenericButtonComponent,
        SignUpFourthFormComponent
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

    ngOnInit() {
    }

    constructor(
        private router: Router,
        private formService: FormService,
        private serviceFactory: ServiceFactory
    ) {
    }

    createAccount() {
        this.form.saveFormData();
        const signUpInfo: FormService = this.formService.get('signUp');
        (this.serviceFactory.get('auth') as AuthenticationService).register(
            signUpInfo.get('email'),
            signUpInfo.get('password'),
            {
                username: signUpInfo.get('username'),
                description: "",
                friends: [],
                pending: [],
                sentRequests: [],
                blocked: [],
                groups: []
            }
        ).subscribe(res => console.log(res));
    }

    protected saveFormData() {
        this.form.saveFormData();
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
