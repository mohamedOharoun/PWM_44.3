import {User} from "./User";

export type Event = {
    name: string;
    description: string;
    date: Date;
    location: string;
    creator: User;
    tags: string[];
    members: User[];
    likes: number;
    comments: number;
    price: number;
}