import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EventCreationThirdFormComponent} from './event-creation-third-form/event-creation-third-form.component';
import {FormStepperComponent} from '../../../components/form-stepper/form-stepper.component';
import {GenericButtonComponent} from '../../../components/generic-button/generic-button.component';

@Component({
  selector: 'app-event-creation-third',
  imports: [
    FormStepperComponent,
    GenericButtonComponent,
    EventCreationThirdFormComponent,
  ],
  templateUrl: './event-creation-third.component.html',
  styleUrl: '../event-creation.css'
})
export class EventCreationThirdComponent {
  @ViewChild(EventCreationThirdFormComponent) form!: EventCreationThirdFormComponent;
  protected currentStep: number = 3;
  protected previousStep: { step: number; route: string; text: String } = {
    step: 2,
    route: 'eventCreationSecond',
    text: ''
  };

  constructor(private router: Router) {}

  protected changePage(step: { step: number; route: string; text: String }) {
    this.router.navigate([step.route]).then();
  }

  createEvent() {

  }
}
