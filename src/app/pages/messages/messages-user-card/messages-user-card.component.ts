import {Component, Input} from '@angular/core';
import {User} from "../../../../architecture/model/User";

@Component({
  selector: 'app-messages-user-card',
  imports: [],
  templateUrl: './messages-user-card.component.html',
  styleUrl: './messages-user-card.component.css'
})
export class MessagesUserCardComponent {
  @Input() user: User | null = null;

}
