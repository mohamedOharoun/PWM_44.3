import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {FormsModule, NgForm} from "@angular/forms";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../architecture/io/services/AuthenticationService";
import {ServiceFactory} from "../../../services/service-factory.service";

@Component({
    selector: 'app-sign-up-fourth-form',
    imports: [
        FormsModule,
        GenericButtonComponent
    ],
    templateUrl: './sign-up-fourth-form.component.html',
    standalone: true,
    styleUrl: './sign-up-fourth-form.component.css'
})
export class SignUpFourthFormComponent {
    private formData: FormService | null = null;
    protected firstPolicy: string = "";
    protected secondPolicy: string = "";
    protected previousStep: { step: number; route: string; text: String } = {
        step: 3,
        route: 'signUpThird',
        text: ''
    };

    constructor(
        private formService: FormService,
        private router: Router,
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        this.formData = this.formService.get('signUp');
        this.firstPolicy = this.formData?.getOrDefault('firstPolicy', '');
        this.secondPolicy = this.formData?.getOrDefault('secondPolicy', '');
    }

    saveFormData() {
        this.formData?.put('firstPolicy', this.firstPolicy);
        this.formData?.put('secondPolicy', this.secondPolicy);
        this.formData?.update();
        this.formService.update();
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }

    createAccount(form: NgForm) {
        this.saveFormData();
        if (form.invalid) return;
        const signUpInfo: FormService = this.formService.get('signUp');
        (this.serviceFactory.get('auth') as AuthenticationService).register(
            signUpInfo.get('email'),
            signUpInfo.get('password'),
            {
                username: signUpInfo.get('username'),
                description: signUpInfo.getOrDefault('description', ''),
                image: signUpInfo.get('image')
            }
        ).subscribe();
    }
}
