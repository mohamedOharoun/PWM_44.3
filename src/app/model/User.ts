import {Group} from "./Group";

export type User = {
    name: string;
    username: string;
    description: string;
    image: string;
    friends: User[];
    pending: User[];
    sentRequests: User[];
    blocked: User[];
    groups: Group[];
}