export interface Filter {
    readonly key: string;
    readonly value: any;

    apply(): void;
}