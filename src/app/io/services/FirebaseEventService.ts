import {Observable, from, map} from "rxjs";
import {EventService} from "../../../architecture/io/services/EventService";
import {Event} from "../../../architecture/model/Event";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    updateDoc,
    query,
    where,
    getDocs, collectionData, docData, setDoc
} from "@angular/fire/firestore";

export class FirebaseEventService implements EventService {
    constructor(private store: Firestore) {
    }

    isJoinedEvent(eventID: string, userID: string): Observable<boolean> {
        return from(getDoc(doc(this.store, `users/${userID}/joined_events/${eventID}`))).pipe(
            map(snapshot => snapshot.exists())
        );
    }

    isLikedEvent(eventID: string, userID: string): Observable<boolean> {
        return from(getDoc(doc(this.store, `users/${userID}/liked_events/${eventID}`))).pipe(
            map(snapshot => snapshot.exists())
        );
    }

    joinEvent(event: Event, userID: string): void {
        event.members.push(userID);
        setDoc(doc(this.store, `users/${userID}/joined_events/${event.id}`), {id: event.id}).then();
        updateDoc(doc(this.store, `events/${event.id}`), {...event}).then();
    }

    leaveEvent(event: Event, userID: string): void {
        event.members = event.members.filter(m => m !== userID);
        deleteDoc(doc(this.store, `users/${userID}/joined_events/${event.id}`)).then();
        updateDoc(doc(this.store, `events/${event.id}`), {...event}).then();
    }

    likeEvent(event: Event, userID: string): void {
        setDoc(doc(this.store, `users/${userID}/liked_events/${event.id}`), {id: event.id}).then();
        updateDoc(doc(this.store, `events/${event.id}`), {...event}).then();
    }

    unlikeEvent(event: Event, userID: string): void {
        deleteDoc(doc(this.store, `users/${userID}/liked_events/${event.id}`)).then();
        updateDoc(doc(this.store, `events/${event.id}`), {...event}).then();
    }

    events(): Observable<Event[]> {
        const data = collectionData(collection(this.store, 'events'), {idField: 'id'});
        return data as Observable<Event[]>;
    }

    createEvent(event: Event): void {
        const eventsCollection = collection(this.store, 'events');
        addDoc(eventsCollection, event).then();
    }

    updateEvent(event: Event): void {
        const eventRef = doc(this.store, `events/${event.id}`);
        updateDoc(eventRef, {...event}).then();
    }

    removeEventGiven(id: string): void {
        deleteDoc(doc(this.store, `events/${id}`)).then();
    }

    eventWith(id: string): Observable<Event> {
        return docData(doc(this.store, `events/${id}`), {idField: 'id'}) as Observable<Event>;
    }

    createdEventsOf(userID: string): Observable<Event[]> {
        const eventsCollection = collection(this.store, 'events');
        const q = query(eventsCollection, where('creator', '==', userID));
        return from(getDocs(q)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc => ({id: doc.id, ...(doc.data() as Event)}))
            )
        );
    }

    favouriteEventsOf(userID: string): Observable<Event[]> {
        const eventsCollection = collection(this.store, 'events');
        const q = query(eventsCollection, where('favourites', 'array-contains', userID));
        return from(getDocs(q)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc => ({id: doc.id, ...(doc.data() as Event)}))
            )
        );
    }

    joinedEventsOf(userID: string): Observable<Event[]> {
        const eventsCollection = collection(this.store, 'events');
        const q = query(eventsCollection, where('members', 'array-contains', userID));
        return from(getDocs(q)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc => ({id: doc.id, ...(doc.data() as Event)}))
            )
        );
    }
}
