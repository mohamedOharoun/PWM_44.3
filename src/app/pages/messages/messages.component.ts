import { Component } from '@angular/core';
import {MessageInputComponent} from "../../components/message-input/message-input.component";

@Component({
  selector: 'app-messages',
  imports: [
    MessageInputComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

}
