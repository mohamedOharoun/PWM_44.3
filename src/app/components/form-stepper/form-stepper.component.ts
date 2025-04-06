import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-form-stepper',
    imports: [
        NgClass
    ],
    templateUrl: './form-stepper.component.html',
    styleUrl: './form-stepper.component.css'
})
export class FormStepperComponent {
    @Input() steps: { step: number; route: string; text: String }[] = [];
    @Input() currentStep: number = 1;
    @Output() saveDataEmitter = new EventEmitter<string>();

    protected getStepClass(step: number) {
        return this.currentStep === step ? 'focused-step' : this.currentStep > step ? 'previous-step' : 'non-focused-step';
    }

    emit(route: string) {
        this.saveDataEmitter.emit(route);
    }
}
