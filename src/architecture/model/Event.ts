export type Event = {
    id?: string;
    name: string;
    description: string;
    date: string;
    location: string;
    creator: string;
    tags: string[];
    members: string[];
    isPrivate: boolean;
    comments: number;
    price: number;
}
