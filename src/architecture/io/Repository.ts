import {Criteria} from "./criteria/Criteria";

export interface Repository<T> {
    create(parameters: {[key: string]: any}): T;
    get(criteria: Criteria): T;
    update(criteria: Criteria, parameters: {[key: string]: any}): T;
    delete(criteria: Criteria): T[];
}