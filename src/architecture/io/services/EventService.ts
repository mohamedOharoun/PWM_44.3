import {Service} from "./Service";
import {Observable} from "rxjs";
import {Event} from '../../model/Event';

export interface EventService extends Service {
    createEvent(event: Event): void;
    updateEvent(event: Event): void;
    removeEventGiven(id: string): Observable<Event>;
    eventWith(id: string): Observable<Event>
    createdEventsOf(userID: string): Observable<Event[]>;
    favouriteEventsOf(userID: string): Observable<Event[]>;
    joinedEventsOf(userID: string): Observable<Event[]>;
}