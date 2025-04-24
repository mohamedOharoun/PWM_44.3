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

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.name = this.formService.get('name') || '';
    this.dateTime = this.formService.get('dateTime') || '';
    this.price = this.formService.get('price') || null;
    this.isPrivate = this.formService.get('isPrivate') || false;
    this.place = this.formService.get('place') || '';
  }

  saveFormData() {
    this.formService.put('name', this.name);
    this.formService.put('dateTime', this.dateTime);
    this.formService.put('price', this.price);
    this.formService.put('isPrivate', this.isPrivate);
    this.formService.put('place', this.place);
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
