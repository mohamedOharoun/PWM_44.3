import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {User} from "../../../architecture/model/User";
import {BehaviorSubject, from, map, Observable, switchMap} from "rxjs";
import {
    Auth,
    browserLocalPersistence,
    createUserWithEmailAndPassword, onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword
} from "@angular/fire/auth";
import {collection, doc, docData, Firestore, getDocs, query, setDoc} from "@angular/fire/firestore";
import {where} from "@angular/fire/firestore";

export class FirebaseAuthenticationService implements AuthenticationService {
    private userSubject = new BehaviorSubject<User | null>(null);
    user: Observable<User | null> = this.userSubject.asObservable();

    constructor(private auth: Auth, private store: Firestore) {
        setPersistence(this.auth, browserLocalPersistence).then(() => {
            onAuthStateChanged(this.auth, user => {
                if (user) {
                    this.getLoggedUser(user.uid).subscribe(userData => {
                        this.userSubject.next(userData);
                    });
                } else {
                    this.userSubject.next(null);
                }
            });
        });
    }

    getLoggedUserUID() {
        return this.auth.currentUser?.uid;
    }

    getUserByName(username: string): Observable<User | null> {
        const q = query(collection(this.store, 'users'), where('username', '==', username))
        return from(getDocs(q)).pipe(
            map((querySnapshot) => {
                if (querySnapshot.empty) {
                    return null;
                }
                return querySnapshot.docs[0].data() as User;
            })
        );
    }

    register(email: string, password: string, extraData: { [key: string]: any; }) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap((userCredential) => {
                const userDocRef = doc(this.store, `users/${userCredential.user.uid}`);
                const userData = { id: userCredential.user.uid, email: userCredential.user.email, ...extraData };
                return from(setDoc(userDocRef, userData)).pipe(
                    map(() => userData as User)
                )
            })
        );
    }

    signIn(email: string, password: string): Observable<User> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap((cred) => this.getLoggedUser(cred.user.uid))
        );
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
    }

    private getLoggedUser(id: string) {
        return docData(doc(this.store, `users/${id}`), { idField: 'id' }) as Observable<User>;
    }
}