import { Observable } from "rxjs";
import {EventService} from "../../../architecture/io/services/EventService";
import {Event} from "../../../architecture/model/Event";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";

export class FirebaseEventService implements EventService {
    constructor(
        private store: Firestore
    ) {
    }

    createEvent(event: Event): void {
        const eventsCollection = collection(this.store, 'events');
        addDoc(eventsCollection, event).then();
    }

    updateEvent(event: Event): void {

    }

    removeEventGiven(id: string): Observable<Event> {
        throw new Error("Method not implemented.");
    }

    eventWith(id: string): Observable<Event> {
        throw new Error("Method not implemented.");
    }

    createdEventsOf(userID: string): Observable<Event[]> {
        throw new Error("Method not implemented.");
    }

    favouriteEventsOf(userID: string): Observable<Event[]> {
        throw new Error("Method not implemented.");
    }

    joinedEventsOf(userID: string): Observable<Event[]> {
        throw new Error("Method not implemented.");
    }
}