export type Event = {
    id?: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    creator: string;
    tags: string[];
    members: string[];
    likes: number;
    isPrivate: boolean;
    comments: number;
    price: number;
}
