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
  getDocs
} from "@angular/fire/firestore";

export class FirebaseEventService implements EventService {
  constructor(private store: Firestore) {
  }

  createEvent(event: Event): void {
    const eventsCollection = collection(this.store, 'events');
    addDoc(eventsCollection, event).then();
  }

  updateEvent(event: Event): void {
    const eventRef = doc(this.store, 'events', event.id!);
    updateDoc(eventRef, {...event}).then();
  }

  removeEventGiven(id: string): Observable<Event> {
    const eventRef = doc(this.store, 'events', id);
    return from(getDoc(eventRef)).pipe(
      map(snapshot => {
        const eventData = snapshot.data() as Event;
        deleteDoc(eventRef);
        return {id: snapshot.id, ...eventData};
      })
    );
  }

  eventWith(id: string): Observable<Event> {
    const eventRef = doc(this.store, 'events', id);
    return from(getDoc(eventRef)).pipe(
      map(snapshot => ({id: snapshot.id, ...(snapshot.data() as Event)}))
    );
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
