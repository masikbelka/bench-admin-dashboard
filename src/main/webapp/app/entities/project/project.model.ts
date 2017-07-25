import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
        public startDate?: any,
        public endDate?: any,
        public billingConcept?: BaseEntity,
        public billingType?: BaseEntity,
        public category?: BaseEntity,
    ) {
    }
}
