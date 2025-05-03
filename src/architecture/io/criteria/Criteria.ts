import {Order} from "./Order";
import {Filter} from "./Filter";

export class Criteria {
    private readonly _filters: Filter[] = [];
    private readonly _order?: Order;

    constructor(filters: Filter[], order?: Order) {
        this._filters = filters;
        this._order = order;
    }

    filters(): Filter[] {
        return this._filters;
    }

    order() {
        return this._order;
    }

    static Builder = class {
        private filters: Filter[] = [];
        private order?: Order;

        private constructor() {
        }

        static create() {
            return new Criteria.Builder()
        }

        addFilter(filter: Filter) {
            this.filters.push(filter);
        }

        withOrder(order: Order) {
            this.order = order;
        }

        build() {
            return new Criteria(this.filters, this.order);
        }
    }
}