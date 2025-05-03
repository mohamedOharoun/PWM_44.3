import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {FormsModule, NgForm} from "@angular/forms";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {Router, RouterLink} from "@angular/router";
import {ServiceFactory} from "../../../services/service-factory.service";
import {UserService} from "../../../../architecture/io/services/UserService";

@Component({
    selector: 'app-sign-up-first-form',
    imports: [
        FormsModule,
        GenericButtonComponent,
        RouterLink
    ],
    templateUrl: './sign-up-first-form.component.html',
    styleUrl: './sign-up-first-form.component.css'
})
export class SignUpFirstFormComponent {
    private formData: FormService | null = null;
    protected email: string = "";
    protected password: string = "";
    protected passwordConfirmation: string = "";
    protected nextStep: { step: number; route: string; text: String } = {
        step: 2,
        route: 'signUpSecond',
        text: ''
    };
    protected emailExists: boolean = false;

    constructor(
        private formService: FormService,
        private router: Router,
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        this.formData = this.formService.createFormEntry('signUp');
        this.email = this.formData?.getOrDefault('email', '');
        this.password = this.formData?.getOrDefault('password', '');
        this.passwordConfirmation = this.formData?.getOrDefault('passwordConfirmation', '');
    }

    saveFormData() {
        this.formData?.put('email', this.email);
        this.formData?.put('password', this.password);
        this.formData?.put('passwordConfirmation', this.passwordConfirmation);
        this.formData?.update();
        this.formService.update();
    }

    changePage(step: { step: number; route: string; text: String }, form: NgForm) {
        this.saveFormData();
        if (form.invalid && step.step > 1) return;
        this.router.navigate([step.route]).then();
    }

    checkEmail() {
        if (this.email.length > 0) return;
        (this.serviceFactory.get('user') as UserService).userWithEmail(this.email).subscribe(res => this.emailExists = res.length > 0);
    }
}
