import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-sign-up-fourth-form',
    imports: [
        FormsModule
    ],
    templateUrl: './sign-up-fourth-form.component.html',
    standalone: true,
    styleUrl: './sign-up-fourth-form.component.css'
})
export class SignUpFourthFormComponent {
    private formData: FormService | null = null;
    protected firstPolicy: string = "";
    protected secondPolicy: string = "";

    constructor(private formService: FormService) {
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
}
