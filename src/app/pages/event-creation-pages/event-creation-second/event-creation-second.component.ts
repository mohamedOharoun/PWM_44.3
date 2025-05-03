import {Component, ViewChild} from '@angular/core';
import {
  EventCreationFirstFormComponent
} from '../event-creation-first/event-creation-first-form/event-creation-first-form.component';
import {FormStepperComponent} from '../../../components/form-stepper/form-stepper.component';
import {GenericButtonComponent} from '../../../components/generic-button/generic-button.component';
import {Router} from '@angular/router';
import {EventCreationSecondFormComponent} from './event-creation-second-form/event-creation-second-form.component';

@Component({
  selector: 'app-event-creation-second',
  imports: [
    FormStepperComponent,
    GenericButtonComponent,
    EventCreationSecondFormComponent,
  ],
  templateUrl: './event-creation-second.component.html',
  styleUrl: '../event-creation.css'
})
export class EventCreationSecondComponent {
  @ViewChild(EventCreationSecondFormComponent) form!: EventCreationSecondFormComponent;
  protected currentStep: number = 2;
  protected previousStep: { step: number; route: string; text: String } = {
    step: 1,
    route: 'eventCreationFirst',
    text: ''
  };
  protected nextStep: { step: number; route: string; text: String } = {
    step: 3,
    route: 'eventCreationThird',
    text: ''
  };

  constructor(private router: Router) {}

  protected changePage(step: { step: number; route: string; text: String }) {
    this.router.navigate([step.route]).then();
  }
}
