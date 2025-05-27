import {AuthenticationService} from "../../../architecture/io/services/AuthenticationService";
import {User} from "../../../architecture/model/User";
import {BehaviorSubject, from, map, Observable, Subscription, switchMap} from "rxjs";
import {
    Auth,
    browserLocalPersistence,
    createUserWithEmailAndPassword, onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword
} from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";

export class FirebaseAuthenticationService implements AuthenticationService {
    private userSubject = new BehaviorSubject<User | null>(null);
    user: Observable<User | null> = this.userSubject.asObservable();

    private userSubscription: Subscription | null = null;

    constructor(private auth: Auth, private store: Firestore) {
        setPersistence(this.auth, browserLocalPersistence);
        onAuthStateChanged(this.auth, firebaseUser => {
            if (this.userSubscription) {
                this.userSubscription.unsubscribe();
                this.userSubscription = null;
            }
            if (firebaseUser) {
                this.userSubscription = this.getLoggedUser(firebaseUser.uid).subscribe(userData => {
                    this.userSubject.next(userData);
                });
            } else {
                this.userSubject.next(null);
            }
        });
    }

    getLoggedUserUID() {
        return this.auth.currentUser?.uid;
    }

    register(email: string, password: string, extraData: { [key: string]: any; }) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap((userCredential) => {
                const userDocRef = doc(this.store, `users/${userCredential.user.uid}`);
                const userData = {
                    id: userCredential.user.uid,
                    email: email,
                    name: extraData["name"],
                    username: extraData["username"],
                    description: extraData["description"],
                    image: extraData["image"],
                    birthDate: extraData["birthDate"]
                };
                
                return from(setDoc(userDocRef, userData)).pipe(
                    switchMap(() => from(this.auth.signOut())),
                    map(() => {
                        this.userSubject.next(null);
                        return userData as User;
                    })
                );
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