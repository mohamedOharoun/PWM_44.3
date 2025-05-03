import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EventCreationThirdFormComponent} from './event-creation-third-form/event-creation-third-form.component';
import {FormStepperComponent} from '../../../components/form-stepper/form-stepper.component';
import {GenericButtonComponent} from '../../../components/generic-button/generic-button.component';
import {FormService} from '../../../services/form.service';
import {ServiceFactory} from '../../../services/service-factory.service';
import {EventService} from '../../../../architecture/io/services/EventService';
import {Event} from '../../../../architecture/model/Event';
import {User} from '../../../../architecture/model/User';
import {AuthenticationService} from '../../../../architecture/io/services/AuthenticationService';

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

  constructor(
    private router: Router,
    private formService: FormService,
    private serviceFactory: ServiceFactory
  ) {
  }

  createEvent() {
    this.form.saveFormData();
    const eventInfo: FormService = this.formService.get('newEvent');

    const authService = this.serviceFactory.get('auth') as AuthenticationService;
    authService.user.subscribe((user: User | null) => {
      if (user) {
        const event: Event = {
          name: eventInfo.get('name'),
          description: eventInfo.get('description'),
          date: new Date(eventInfo.get('date')),
          location: eventInfo.get('location'),
          price: Number(eventInfo.get('price')),
          tags: eventInfo.get('tags') || [],
          creator: user,
          members: [],
          likes: 0,
          comments: 0
        };

        (this.serviceFactory.get('events') as EventService).createEvent(event);
      } else {
        console.error("There is not user logged in.");
      }
    });
  }

  protected saveFormData() {
    this.form.saveFormData();
  }

  protected changePage(step: { step: number; route: string; text: String }) {
    this.saveFormData();
    this.router.navigate([step.route]).then();
  }
}
