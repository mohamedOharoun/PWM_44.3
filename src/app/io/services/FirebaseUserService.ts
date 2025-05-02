import { Observable } from "rxjs";
import {UserService} from "../../../architecture/io/services/UserService";
import {Group} from "../../../architecture/model/Group";
import {User} from "../../../architecture/model/User";
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";

export class FirebaseUserService implements UserService {
    constructor(
        private store: Firestore
    ) {
    }

    userWith(id: string): Observable<User> {
        return docData(doc(this.store, `users/${id}`), { idField: 'id' }) as Observable<User>;
    }

    friendsOf(id: string): Observable<User[]> {
        throw new Error("Method not implemented.");
    }

    groupsOf(id: string): Observable<Group[]> {
        throw new Error("Method not implemented.");
    }

    blockedOf(id: string): Observable<User[]> {
        throw new Error("Method not implemented.");
    }

    pendingOf(id: string): Observable<User[]> {
        throw new Error("Method not implemented.");
    }

    sentRequestsOf(id: string): Observable<User[]> {
        throw new Error("Method not implemented.");
    }
}