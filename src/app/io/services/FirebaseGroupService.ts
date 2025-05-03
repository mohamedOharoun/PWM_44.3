import { Observable } from "rxjs";
import {GroupService} from "../../../architecture/io/services/GroupService";
import {addDoc, collection, deleteDoc, doc, docData, Firestore} from "@angular/fire/firestore";
import {Group} from "../../../architecture/model/Group";

export class FirebaseGroupService implements GroupService {
    constructor(
        private store: Firestore
    ) {
    }

    create(group: Group): void {
        addDoc(collection(this.store, 'groups'), group).then();
    }

    groupWith(id: string): Observable<Group> {
        return docData(doc(this.store, `groups/${id}`), { idField: 'id' }) as Observable<Group>;
    }

    removeWith(id: string): void {
        deleteDoc(doc(this.store, `groups/${id}`)).then();
    }
}