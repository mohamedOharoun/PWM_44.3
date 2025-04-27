import {Observable} from "rxjs";
import {User} from "../../model/User";
import {Group} from "../../model/Group";
import {Service} from "./Service";

export interface UserService extends Service {
    userWith(id: string): Observable<User>;
    friendsOf(id: string): Observable<User[]>;
    groupsOf(id: string): Observable<Group[]>;
    blockedOf(id: string): Observable<User[]>;
    pendingOf(id: string): Observable<User[]>;
    sentRequestsOf(id: string): Observable<User[]>;
}