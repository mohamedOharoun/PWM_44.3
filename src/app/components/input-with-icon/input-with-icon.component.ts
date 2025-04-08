import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-input-with-icon',
    imports: [
        NgClass,
        FormsModule
    ],
    templateUrl: './input-with-icon.component.html',
    styleUrl: './input-with-icon.component.css'
})
export class InputWithIconComponent {
    @Input() icon: string = "";
    @Input() placeholder: string = "E-mail";
    @Input() type: string = "text";
    @Input() inputDirection: string = "rotate-90";
    @Input() value: string = "";
    @Output() valueEmitter = new EventEmitter<string>();

    emitValue() {
        this.valueEmitter.emit(this.value);
    }
}
