import { BaseEntity } from './../../shared';

export class OpportunityType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
