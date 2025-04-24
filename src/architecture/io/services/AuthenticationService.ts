import {Service} from "./Service";
import {User} from "../../model/User";
import {Observable} from "rxjs";

export interface AuthenticationService extends Service {
    register(email: string, password: string, extraData: {[key: string]: any}): Observable<User>;
    signIn(email: string, password: string): Observable<User>;
    signOut(): void;
    getLoggedUserUID(): string | undefined;
}