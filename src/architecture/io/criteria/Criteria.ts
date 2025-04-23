export interface Criteria {
    filters: Filter[];
    order: Order;
    limit?: number;
    offset
}