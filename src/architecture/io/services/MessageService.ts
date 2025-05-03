import {Service} from "./Service";
import {Observable} from "rxjs";
import {Message} from "../../model/Message";

export interface MessageService extends Service {
    messagesOf(senderID: string, recipientID: string): Observable<Message[]>;
    sendMessage(message: Message): void;
    delete(id: string): void;
}