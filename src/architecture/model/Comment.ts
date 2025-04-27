import {User} from "./User";

export type Comment = {
    eventID: string;
    user: User;
    body: string;
}