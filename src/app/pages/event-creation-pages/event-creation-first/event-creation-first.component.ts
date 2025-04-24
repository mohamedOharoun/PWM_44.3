import {Component, ViewChild} from '@angular/core';
import {FormStepperComponent} from '../../../components/form-stepper/form-stepper.component';
import {Router} from '@angular/router';
import {GenericButtonComponent} from '../../../components/generic-button/generic-button.component';
import {EventCreationFirstFormComponent} from './event-creation-first-form/event-creation-first-form.component';

@Component({
  selector: 'app-event-creation-first',
  imports: [
    FormStepperComponent,
    GenericButtonComponent,
    EventCreationFirstFormComponent,
  ],
  templateUrl: './event-creation-first.component.html',

  styleUrl: '../event-creation.css'
})
export class EventCreationFirstComponent {
  @ViewChild(EventCreationFirstFormComponent) form!: EventCreationFirstFormComponent;
  protected currentStep: number = 1;
  protected nextStep: { step: number; route: string; text: string } = {
    step: 2,
    route: 'eventCreationSecond',
    text: ''
  };

  constructor(private router: Router) {}

  protected saveFormData() {
    this.form.saveFormData();
  }

  protected changePage(step: { step: number; route: string; text: String }) {
    this.saveFormData();
    this.router.navigate([step.route]).then();
  }
}
