import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-generic-button',
    imports: [
        NgClass
    ],
    templateUrl: './generic-button.component.html',
    standalone: true,
    styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
    @Input() text: string =  "";
    @Input() buttonClass: string = "";
}
