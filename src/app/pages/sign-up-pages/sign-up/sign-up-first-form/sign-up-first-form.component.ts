import {Component} from '@angular/core';
import {InputWithIconComponent} from "../../../../components/input-with-icon/input-with-icon.component";
import {FormService} from "../../../../services/form.service";

@Component({
    selector: 'app-sign-up-first-form',
    imports: [
        InputWithIconComponent
    ],
    templateUrl: './sign-up-first-form.component.html',
    styleUrl: './sign-up-first-form.component.css'
})
export class SignUpFirstFormComponent {
    private formData: FormService | null = null;
    protected email: string = "";
    protected password: string = "";
    protected passwordConfirmation: string = "";

    constructor(private formService: FormService) {
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

    protected setEmailValue(value: string) {
        this.email = value;
    }

    protected setPasswordValue(value: string) {
        this.password = value;
    }

    protected setPasswordConfirmationValue(value: string) {
        this.passwordConfirmation = value;
    }
}
