import {User} from "./User";

export type Message = {
    from: User;
    to: User;
    body: string;
    timestamp: Date;
}