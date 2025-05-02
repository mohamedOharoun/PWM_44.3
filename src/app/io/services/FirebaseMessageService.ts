import {combineLatest, from, map, Observable} from "rxjs";
import {MessageService} from "../../../architecture/io/services/MessageService";
import {Message} from "../../../architecture/model/Message";
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    getDocs,
    query,
    where
} from "@angular/fire/firestore";

export class FirebaseMessageService implements MessageService {
    constructor(
        private store: Firestore
    ) {
    }

    delete(id: string): void {
        deleteDoc(doc(this.store, `messages/${id}`)).then();
    }

    messagesOf(senderID: string, recipientID: string): Observable<Message[]> {
        const sentQuery = query(
            collection(this.store, 'messages'),
            where('from', '==', senderID),
            where('to', '==', recipientID)
        );

        const receivedQuery = query(
            collection(this.store, 'messages'),
            where('from', '==', recipientID),
            where('to', '==', senderID)
        );

        const sentMessages$ = collectionData(sentQuery, { idField: 'id' }) as Observable<Message[]>;
        const receivedMessages$ = collectionData(receivedQuery, { idField: 'id' }) as Observable<Message[]>;

        return combineLatest([sentMessages$, receivedMessages$]).pipe(
            map(([sent, received]) => [...sent, ...received])
        );
    }


    sendMessage(message: Message): void {
        const messagesCollection = collection(this.store, 'messages');
        addDoc(messagesCollection, message).then();
    }
}