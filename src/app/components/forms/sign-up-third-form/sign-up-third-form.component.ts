import {Component} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {GenericButtonComponent} from "../../generic-button/generic-button.component";
import {Router} from "@angular/router";
import {FormsModule} from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
    selector: 'app-sign-up-third-form',
  imports: [
    GenericButtonComponent,
    FormsModule

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

    protected async triggerFileInput() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos
            });
            
            if (image.dataUrl) {
                this.setImageValue(image.dataUrl);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    }

    protected changePage(step: { step: number; route: string; text: String }) {
        this.saveFormData();
        this.router.navigate([step.route]).then();
    }
}
