import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-message-input',
    imports: [
        FormsModule
    ],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
    @Input() value: string = "";
    @Output() valueEmitter = new EventEmitter<string>();

    emitValue() {
        this.valueEmitter.emit(this.value);
        this.value = "";
    }
}
