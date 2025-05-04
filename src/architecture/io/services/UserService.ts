import {Observable} from "rxjs";
import {User} from "../../model/User";
import {Service} from "./Service";
import {FriendRequest} from "../../model/FriendRequest";

export interface UserService extends Service {
    userWith(id: string): Observable<User>;
    userNamed(name: string): Observable<User[]>;
    userWithEmail(email: string): Observable<User[]>;
    friendsOf(id: string): Observable<string[]>;
    groupsOf(id: string): Observable<string[]>;
    blockedOf(id: string): Observable<string[]>;
    pendingOf(id: string): Observable<string[]>;
    sentRequestsOf(id: string): Observable<string[]>;
    addUser(from: string, to: string): void;
    blockUser(from: string, to: string): void;
    unblockUser(from: string, to: string): void;
    removeUser(from: string, to: string): void;
    acceptRequest(request: FriendRequest): void;
    cancelRequest(request: FriendRequest): void;
    requestFrom(userID: string, requestID: string): Observable<FriendRequest>;
    pendingTo(userID: string, requestID: string): Observable<FriendRequest>;
}