import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-generic-button',
    imports: [
        IonicModule,
        CommonModule // Import CommonModule to use ngClass
    ],
    templateUrl: './generic-button.component.html',
    standalone: true,
    styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
    @Input() text: string = "";
    @Input() buttonClass: string = "";
    @Input() type: string = 'submit';
}