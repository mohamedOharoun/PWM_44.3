import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {InputWithIconComponent} from "../../input-with-icon/input-with-icon.component";

@Component({
    selector: 'app-sign-up-second-form',
    imports: [
        InputWithIconComponent
    ],
    templateUrl: './sign-up-second-form.component.html',
    styleUrl: './sign-up-second-form.component.css'
})
export class SignUpSecondFormComponent {
    private formData: FormService | null = null;
    protected name: string = "";
    protected username: string = "";
    protected birthDate: string = "";

    constructor(private formService: FormService) {
    }

    ngOnInit() {
        this.formData = this.formService.get('signUp');
        this.name = this.formData?.getOrDefault('name', '');
        this.username = this.formData?.getOrDefault('username', '');
        this.birthDate = this.formData?.getOrDefault('birthDate', '');
    }

    saveFormData() {
        this.formData?.put('name', this.name);
        this.formData?.put('username', this.username);
        this.formData?.put('birthDate', this.birthDate);
        this.formData?.update();
        this.formService.update();
    }

    protected setNameValue(value: string) {
        this.name = value;
    }

    protected setUsernameValue(value: string) {
        this.username = value;
    }

    protected setBirthDateValue(value: string) {
        this.birthDate = value;
    }
}
