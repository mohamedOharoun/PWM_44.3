import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageInputComponent} from "../../components/message-input/message-input.component";
import {MessagesUserCardComponent} from "../../components/messages-user-card/messages-user-card.component";
import {MessageCardComponent} from "../../components/message-card/message-card.component";
import {Message} from "../../../architecture/model/Message";
import {ServiceFactory} from "../../services/service-factory.service";
import {MessageService} from "../../../architecture/io/services/MessageService";
import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {UserService} from "../../../architecture/io/services/UserService";
import {User} from "../../../architecture/model/User";
import {Auth} from "@angular/fire/auth";

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
    @ViewChild('withScroll') private withScroll!: ElementRef;
    @ViewChildren('item') private itemsElements!: QueryList<ElementRef>;
    private recipientID = '3MlqqavZWJfRZoytm1dp6nhw0Or1';
    protected friends: string[] = [];
    protected senderID: string | null = null;
    protected currentChatUser: User | null = null;

    protected messages: Message[] = [];

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        (this.serviceFactory.get('user') as UserService).userWith(this.recipientID).subscribe(res => this.currentChatUser = res);
        (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(user => {
            this.senderID = user?.id!;
            (this.serviceFactory.get('user') as UserService).friendsOf(user!.id!).subscribe(users => {
                this.friends = users!;
                this.recipientID = this.friends[0];
            });
            (this.serviceFactory.get('message') as MessageService).messagesOf(this.senderID, this.recipientID).subscribe(messages => {
                this.messages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            })
        });
    }

    ngAfterViewInit() {
        this.itemsElements.changes.subscribe(() => this.scrollToBottom());
    }

    sendMessage(message: string) {
        (this.serviceFactory.get('message') as MessageService).sendMessage({
            from: this.senderID!,
            to: this.recipientID,
            body: message,
            timestamp: new Date().toISOString()
        });
    }

    private scrollToBottom() {
        this.withScroll.nativeElement.scrollTop = this.withScroll.nativeElement.scrollHeight;
    }
}
