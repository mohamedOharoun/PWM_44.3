import {Group} from "./Group";

export type User = {
    email: string;
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