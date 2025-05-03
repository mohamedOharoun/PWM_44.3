import {Service} from "./Service";
import {Group} from "../../model/Group";
import {Observable} from "rxjs";

export interface GroupService extends Service {
    update(group: Group): void;
    create(group: Group): void;
    groupWith(id: string): Observable<Group>;
    removeWith(id: string): void;
    groupsOf(id: string): Observable<Group[]>;
}