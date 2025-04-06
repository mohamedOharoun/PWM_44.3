import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-input-with-icon',
    imports: [
        NgClass
    ],
    templateUrl: './input-with-icon.component.html',
    styleUrl: './input-with-icon.component.css'
})
export class InputWithIconComponent {
    @Input() icon: string = "";
    @Input() placeholder: string = "E-mail";
    @Input() type: string = "text";
    @Input() inputDirection: string = "rotate-90";
}
