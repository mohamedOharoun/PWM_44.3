import {Service} from "./Service";
import {Observable} from "rxjs";
import {Event} from '../../model/Event';

export interface EventService extends Service {
    events(): Observable<Event[]>;
    createEvent(event: Event): void;
    updateEvent(event: Event): void;
    removeEventGiven(id: string): void;
    eventWith(id: string): Observable<Event>
    createdEventsOf(userID: string): Observable<Event[]>;
    favouriteEventsOf(userID: string): Observable<Event[]>;
    joinedEventsOf(userID: string): Observable<Event[]>;
    joinEvent(event: Event, userID: string): void;
    leaveEvent(event: Event, userID: string): void;
    likeEvent(event: Event, userID: string): void;
    unlikeEvent(event: Event, userID: string): void;
    isJoinedEvent(eventID: string, userID: string): Observable<boolean>;
    isLikedEvent(eventID: string, userID: string): Observable<boolean>;
}