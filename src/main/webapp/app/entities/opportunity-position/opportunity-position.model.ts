import { BaseEntity } from './../../shared';

const enum PositionStatus {
    'CREATED',
    'CLOSED',
    'ASSIGNED',
    'ON_HOLD',
    'CANCELLED',
    'IN_PROGRESS',
    'APPROVED',
    'OPEN',
    'TERMINATED',
    'BOOKED',
    'REJECTED'
}

export class OpportunityPosition implements BaseEntity {
    constructor(
        public id?: number,
        public createdTime?: any,
        public employeeUpsaId?: string,
        public employeeFullName?: string,
        public ownerUpsaId?: string,
        public ownerFullName?: string,
        public status?: PositionStatus,
        public opportunity?: BaseEntity,
        public role?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
