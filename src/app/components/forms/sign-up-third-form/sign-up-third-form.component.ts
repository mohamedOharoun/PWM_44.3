import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-up-third-form',
    imports: [
        GenericButtonComponent

    ],
    templateUrl: './sign-up-third-form.component.html',
    styleUrl: './sign-up-third-form.component.css'
})
export class SignUpThirdFormComponent {
    private formData: FormService | null = null;
    protected image: string = "";
    protected previousStep: { step: number; route: string; text: String } = {
        step: 2,
        route: 'signUpSecond',
        text: ''
    };
    protected nextStep: { step: number; route: string; text: String } = {
        step: 4,
        route: 'signUpFourth',
        text: ''
    };

    constructor(
        private formService: FormService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.formData = this.formService.get('signUp');
        this.image = this.formData?.getOrDefault('image', '');
    }

    saveFormData() {
        this.formData?.put('image', this.image);
        this.formData?.update();
        this.formService.update();
    }

    protected setImageValue(value: string) {
        this.image = value;
    }

    protected onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    protected onDrop(event: DragEvent) {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    protected handleFile(file: File) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.setImageValue(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    }

    protected triggerFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    }

    protected onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
