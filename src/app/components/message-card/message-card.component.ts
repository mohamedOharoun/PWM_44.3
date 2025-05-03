import {Component, Input} from '@angular/core';
import {Message} from "../../../architecture/model/Message";
import {NgClass} from "@angular/common";
import {ServiceFactory} from "../../services/service-factory.service";
import {MessageService} from "../../../architecture/io/services/MessageService";

@Component({
    selector: 'app-message-card',
    imports: [
        NgClass
    ],
    templateUrl: './message-card.component.html',
    standalone: true,
    styleUrl: './message-card.component.css'
})
export class MessageCardComponent {
    @Input() message!: Message;
    @Input() own!: boolean;

    constructor(
        private serviceFactory: ServiceFactory
    ) {
    }

    ngOnInit() {
        this.hour = `${new Date(this.message.timestamp).getHours().toString()}:${new Date(this.message.timestamp).getMinutes().toString()}`;
    }

    getClass() {
        return this.own ? 'align-items-end' : 'align-items-start';
    }

    removeMessage() {
        (this.serviceFactory.get('message') as MessageService).delete(this.message.id!);
    }

    protected readonly Date = Date;
    hour!: string;
}
