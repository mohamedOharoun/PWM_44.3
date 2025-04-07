import { Component } from '@angular/core';
import {MessageInputComponent} from "../../components/message-input/message-input.component";
import {MessagesUserCardComponent} from "./messages-user-card/messages-user-card.component";
import {MessageCardComponent} from "./message-card/message-card.component";
import {Message} from "../../model/Message";

@Component({
  selector: 'app-messages',
    imports: [
        MessageInputComponent,
        MessagesUserCardComponent,
        MessageCardComponent
    ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
    protected messages: Message[] = [
        {
            from: {
                email: "string",
                name: "string",
                username: "Manolo",
                description: "string",
                image: "string",
                friends: [],
                pending: [],
                sentRequests: [],
                blocked: [],
                groups: []
            }, to: {
                email: "string",
                name: "string",
                username: "Juan",
                description: "string",
                image: "string",
                friends: [],
                pending: [],
                sentRequests: [],
                blocked: [],
                groups: []
            }, body: "Hola Manolo!", timestamp: new Date()
        }
    ];

}
