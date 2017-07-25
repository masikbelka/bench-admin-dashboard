import { BaseEntity } from './../../shared';

export class BillingType implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
    ) {
    }
}
