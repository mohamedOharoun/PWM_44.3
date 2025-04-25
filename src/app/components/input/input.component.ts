import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  emitValue() {
    this.valueChange.emit(this.value);
  }
}
