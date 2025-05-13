import {User} from "./User";

export type SocialCard = {
    image: string | null;
    text: string;
    icons: string[];
    creator: User;
    members: User[];
    likes: number;
    comments: number;
}