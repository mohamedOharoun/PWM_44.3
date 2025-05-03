import {from, Observable} from "rxjs";
import {GroupService} from "../../../architecture/io/services/GroupService";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    docData,
    Firestore,
    getDocs,
    onSnapshot,
    query, setDoc, updateDoc,
    where
} from "@angular/fire/firestore";
import {Group} from "../../../architecture/model/Group";

export class FirebaseGroupService implements GroupService {
    constructor(
        private store: Firestore
    ) {
    }

    update(group: Group): void {
        updateDoc(doc(this.store, `groups/${group.id}`), {...group}).then();
    }

    groupsOf(id: string): Observable<Group[]> {
        const q = query(
            collection(this.store, 'groups'),
            where('creator', '==', id)
        );

        return new Observable<Group[]>(subscriber => {
            const unsubscribe = onSnapshot(q, snapshot => {
                const groups = snapshot.docs.map(doc => ({
                    ...(doc.data() as Group),
                    id: doc.id
                }));
                subscriber.next(groups);
            }, error => subscriber.error(error));

            return () => unsubscribe();
        });
    }


    create(group: Group): void {
        addDoc(collection(this.store, 'groups'), {...group}).then();
    }

    groupWith(id: string): Observable<Group> {
        return docData(doc(this.store, `groups/${id}`), { idField: 'id' }) as Observable<Group>;
    }

    removeWith(id: string): void {
        deleteDoc(doc(this.store, `groups/${id}`)).then();
    }
}