import {Component, Input} from '@angular/core';
import {Message} from "../../../../architecture/model/Message";

@Component({
    selector: 'app-message-card',
    imports: [],
    templateUrl: './message-card.component.html',
    standalone: true,
    styleUrl: './message-card.component.css'
})
export class MessageCardComponent {
  @Input() message!: Message;

}
