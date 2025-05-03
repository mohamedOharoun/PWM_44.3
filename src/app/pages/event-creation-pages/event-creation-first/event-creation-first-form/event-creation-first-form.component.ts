import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../components/input/input.component';

@Component({
  selector: 'app-event-creation-one-form',
  standalone: true,
  imports: [FormsModule, InputComponent],
  templateUrl: './event-creation-first-form.component.html',
  styleUrl: './event-creation-first-form.component.css'
})
export class EventCreationFirstFormComponent implements OnInit {
  protected name = '';
  protected dateTime = '';
  protected price: number | null = null;
  protected isPrivate = false;
  protected place = '';
  private formData: FormService | null = null;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formData = this.formService.createFormEntry('newEvent')
    this.name = this.formData?.getOrDefault('email', '');
    this.dateTime = this.formData?.getOrDefault('dateTime', '');
    this.price = this.formData?.getOrDefault('price', '');
    this.isPrivate = this.formData?.getOrDefault('isPrivate', '');
    this.place = this.formData?.getOrDefault('place', '');
  }

  saveFormData() {
    this.formData?.put('name', this.name);
    this.formData?.put('dateTime', this.dateTime);
    this.formData?.put('price', this.price);
    this.formData?.put('isPrivate', this.isPrivate);
    this.formData?.put('place', this.place);
    this.formData?.update();
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
