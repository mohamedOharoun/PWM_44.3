import { Component } from '@angular/core';
import {MessageInputComponent} from "../../components/message-input/message-input.component";
import {MessagesUserCardComponent} from "./messages-user-card/messages-user-card.component";
import {MessageCardComponent} from "./message-card/message-card.component";
import {Message} from "../../../architecture/model/Message";
import {ServiceFactory} from "../../services/service-factory.service";
import {MessageService} from "../../../architecture/io/services/MessageService";
import {Timestamp} from "rxjs";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {FirebaseAuthenticationService} from "../../io/services/FirebaseAuthenticationService";

@Component({
    selector: 'app-messages',
    imports: [
        MessageInputComponent,
        MessagesUserCardComponent,
        MessageCardComponent
    ],
    templateUrl: './messages.component.html',
    standalone: true,
    styleUrl: './messages.component.css'
})
export class MessagesComponent {
    private recipientID = '3MlqqavZWJfRZoytm1dp6nhw0Or1';
    private senderID = 'Mn0XXcHvIrYg6l9tVQrgWMmMFYn1';

    protected messages: Message[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('auth') as FirebaseAuthenticationService).user$?.subscribe(user => {
            this.senderID = user.id!;
            (this.serviceFactory.get('message') as MessageService).messagesOf(this.senderID, this.recipientID).subscribe(messages => {
                this.messages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            })
        });
    }

    sendMessage(message: string) {
        (this.serviceFactory.get('message') as MessageService).sendMessage({
            from: this.senderID,
            to: this.recipientID,
            body: message,
            timestamp: new Date().toISOString()
        });
    }
}
