import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {InputWithIconComponent} from "../../input-with-icon/input-with-icon.component";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-sign-up-second-form',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgClass,
        GenericButtonComponent,
        RouterLink
    ],
    templateUrl: './sign-up-second-form.component.html',
    styleUrl: './sign-up-second-form.component.css'
})
export class SignUpSecondFormComponent {
    private formData: FormService | null = null;
    protected name: string = "";
    protected username: string = "";
    protected birthDate: string = "";
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

    constructor(
        private formService: FormService,
        private router: Router
    ) {
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
    changePage(step: { step: number; route: string; text: String }, form: NgForm) {
        this.saveFormData();
        if (form.invalid && step.step > 2) return;
        this.router.navigate([step.route]).then();
    }
}
