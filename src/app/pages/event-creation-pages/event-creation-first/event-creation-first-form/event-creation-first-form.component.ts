import {Component} from '@angular/core';
import {FormService} from '../../../../services/form.service';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../../../../components/input/input.component';

@Component({
  selector: 'app-event-creation-one-form',
  imports: [
    FormsModule,
    InputComponent
  ],
  templateUrl: './event-creation-first-form.component.html',
  styleUrl: './event-creation-first-form.component.css'
})
export class EventCreationFirstFormComponent {
  private formData: FormService | null = null;
  protected name: string = '';
  protected dateTime: string = '';
  protected price: number | null = null;
  protected isPrivate: boolean = false;
  protected place: string = '';

  constructor(private formService: FormService) {}

  saveFormData() {
    this.formData?.put('name', this.name);
    this.formData?.put('dateTime', this.dateTime);
    this.formData?.put('price', this.price);
    this.formData?.put('isPrivate', this.isPrivate);
    this.formData?.put('place', this.place);
    this.formData?.update();
    this.formService.update();
  }

  protected setName(value: string) {
    this.name = value;
  }

  protected setDateTime(value: string) {
    this.dateTime = value;
  }

  protected setPrice(value: string) {
    this.price = parseFloat(value);
  }

  protected togglePrivacy() {
    this.isPrivate = !this.isPrivate;
  }

  protected setPlace(value: string) {
    this.place = value;
  }
}
