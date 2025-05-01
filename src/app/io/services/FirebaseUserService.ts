import {from, map, Observable, of, switchMap} from "rxjs";
import {UserService} from "../../../architecture/io/services/UserService";
import {Group} from "../../../architecture/model/Group";
import {User} from "../../../architecture/model/User";
import {collection, doc, docData, Firestore, getDocs, query, where} from "@angular/fire/firestore";

export class FirebaseUserService implements UserService {
    constructor(
        private store: Firestore
    ) {
    }

    userWith(id: string): Observable<User> {
        return docData(doc(this.store, `users/${id}`), { idField: 'id' }) as Observable<User>;
    }

    friendsOf(id: string): Observable<User[] | null> {
        return this.userWith(id).pipe(
            switchMap(user => {
                if (!user?.friends || user.friends.length === 0) return of(null);
                const q = query(
                    collection(this.store, 'users'),
                    where('id', 'in', user.friends)
                );
                return from(getDocs(q)).pipe(
                    map((querySnapshot) => {
                        if (querySnapshot.empty) return null;
                        return querySnapshot.docs.map(doc => doc.data() as User);
                    })
                );
            })
        );
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