import {from, map, Observable} from "rxjs";
import {MessageService} from "../../../architecture/io/services/MessageService";
import {Message} from "../../../architecture/model/Message";
import {addDoc, collection, collectionData, Firestore, getDocs, query, where} from "@angular/fire/firestore";

export class FirebaseMessageService implements MessageService {
    constructor(
        private store: Firestore
    ) {
    }

    messagesOf(senderID: string, recipientID: string): Observable<Message[]> {
        const q = query(collection(this.store, 'messages'), where('from', '==', senderID), where('to', '==', recipientID));
        return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
    }

    sendMessage(message: Message): void {
        const messagesCollection = collection(this.store, 'messages');
        addDoc(messagesCollection, message).then();
    }
}