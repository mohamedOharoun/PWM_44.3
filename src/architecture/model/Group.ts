import {User} from "./User";

export type Group = {
    name: string;
    creator: User;
    members: User[];
    image: string;
}