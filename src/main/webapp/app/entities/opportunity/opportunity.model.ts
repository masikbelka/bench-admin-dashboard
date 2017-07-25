import { BaseEntity } from './../../shared';

const enum OpportunityStatus {
    'CREATED',
    'CLOSED',
    'ACTIVE',
    'ON_HOLD',
    'CANCELLED',
    'IN_PROGRESS',
    'APPROVED',
    'OPEN',
    'DRAFT',
    'SUBMITTED',
    'REJECTED'
}

export class Opportunity implements BaseEntity {
    constructor(
        public id?: number,
        public staffingId?: string,
        public name?: string,
        public ownerUpsaId?: string,
        public ownerFullName?: string,
        public startDate?: any,
        public endDate?: any,
        public status?: OpportunityStatus,
        public description?: string,
        public staffingCoordinatiorUpsaId?: string,
        public staffingCoordinatiorFullName?: string,
        public responsibleManagerUpsaId?: string,
        public responsibleManagerFullName?: string,
        public supervisorUpsaId?: string,
        public supervisorFullName?: string,
        public deliveryManagerUpsaId?: string,
        public deliveryManagerFullName?: string,
        public accountManagerUpsaId?: string,
        public accountManagerFullName?: string,
        public type?: BaseEntity,
        public assignedPositions?: BaseEntity[],
        public locations?: BaseEntity[],
    ) {
    }
}
