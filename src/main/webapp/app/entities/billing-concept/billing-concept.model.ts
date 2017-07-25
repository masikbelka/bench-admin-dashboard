import { BaseEntity } from './../../shared';

export class BillingConcept implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
    ) {
    }
}
