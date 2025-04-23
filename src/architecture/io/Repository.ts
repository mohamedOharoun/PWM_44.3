export interface Repository<T> {
    create(parameters: {[key: string]: any}): T;
    get(criteria: Criteria[]): T;
    update(criteria: Criteria[], {[key: string]: any}): T[];
    delete(criteria: []): T[];
}