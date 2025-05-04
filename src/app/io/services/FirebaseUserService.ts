import {from, map, Observable} from "rxjs";
import {UserService} from "../../../architecture/io/services/UserService";
import {User} from "../../../architecture/model/User";
import {
    collection, collectionData,
    deleteDoc,
    doc,
    docData,
    Firestore,
    getDocs,
    query,
    setDoc,
    where
} from "@angular/fire/firestore";
import {FriendRequest} from "../../../architecture/model/FriendRequest";

export class FirebaseUserService implements UserService {
    constructor(
        private store: Firestore
    ) {
    }

  getUserByUsername(username: string): Observable<User | null> {
    return collectionData(query(collection(this.store, 'users'), where('username', '==', username)))
      .pipe(
        map(users => users.length > 0 ? users[0] as User : null)
      );
  }

  updateUser(user: User): Promise<void> {
    if (!user.id) throw new Error("User ID is required to update");

    const ref = doc(this.store, `users/${user.id}`);
    return setDoc(ref, user, { merge: true });
  }

  requestFrom(userID: string, requestID: string): Observable<FriendRequest> {
        return docData(doc(this.store, `users/${userID}/sent_requests/${requestID}`), {idField: 'id'}) as Observable<FriendRequest>;
    }

    pendingTo(userID: string, requestID: string): Observable<FriendRequest> {
        return docData(doc(this.store, `users/${userID}/pending/${requestID}`), {idField: 'id'}) as Observable<FriendRequest>;
    }

    acceptRequest(request: FriendRequest): void {
        deleteDoc(doc(this.store, `users/${request.to}/pending/${request.from}`)).then();
        deleteDoc(doc(this.store, `users/${request.from}/sent_requests/${request.to}`)).then();
        setDoc(doc(this.store, `users/${request.from}/friends/${request.to}`), {id: request.to}).then();
        setDoc(doc(this.store, `users/${request.to}/friends/${request.from}`), {id: request.from}).then();
    }

    cancelRequest(request: FriendRequest): void {
        deleteDoc(doc(this.store, `users/${request.from}/sent_requests/${request.to}`)).then();
        deleteDoc(doc(this.store, `users/${request.to}/pending/${request.from}`)).then();
    }

    unblockUser(from: string, to: string): void {
        deleteDoc(doc(this.store, `users/${from}/blocked/${to}`)).then();
    }

    blockUser(from: string, to: string): void {
        this.removeUser(from, to);
        setDoc(doc(this.store, `users/${from}/blocked/${to}`), {id: to}).then();
    }

    removeUser(from: string, to: string): void {
        deleteDoc(doc(this.store, `users/${from}/friends/${to}`)).then();
        deleteDoc(doc(this.store, `users/${to}/friends/${from}`)).then();
    }

    addUser(from: string, to: string): void {
        setDoc(doc(this.store, `users/${from}/sent_requests/${to}`), {from, to}).then();
        setDoc(doc(this.store, `users/${to}/pending/${from}`), {from, to}).then();
    }

    userNamed(name: string): Observable<User[]> {
        const q = query(
            collection(this.store, 'users'),
            where('username', '>=', name),
            where('username', '<', name + '\uf8ff')
        );

        return from(getDocs(q).then(querySnapshot => {
            if (querySnapshot.empty) return [];
            return querySnapshot.docs.map(doc => doc.data() as User);
        }));
    }

    userWith(id: string): Observable<User> {
        return docData(doc(this.store, `users/${id}`), {idField: 'id'}) as Observable<User>;
    }

    friendsOf(id: string) {
        return collectionData(collection(this.store, `users/${id}/friends`), { idField: 'id' }).pipe(
            map(f => f.map(friend => friend.id))
        ) as Observable<string[]>;
    }


    groupsOf(id: string): Observable<string[]> {
        return collectionData(collection(this.store, `users/${id}/groups`), { idField: 'id' }).pipe(
            map(b => b.map(blocked => blocked.id))
        ) as Observable<string[]>;
    }

    blockedOf(id: string): Observable<string[]> {
        return collectionData(collection(this.store, `users/${id}/blocked`), { idField: 'id' }).pipe(
            map(b => b.map(blocked => blocked.id))
        ) as Observable<string[]>;
    }

    pendingOf(id: string): Observable<string[]> {
        return collectionData(collection(this.store, `users/${id}/pending`), { idField: 'id' }).pipe(
            map(b => b.map(blocked => blocked.id))
        ) as Observable<string[]>;
    }

    sentRequestsOf(id: string): Observable<string[]> {
        return collectionData(collection(this.store, `users/${id}/sent_requests`), { idField: 'id' }).pipe(
            map(b => b.map(blocked => blocked.id))
        ) as Observable<string[]>;
    }
}
