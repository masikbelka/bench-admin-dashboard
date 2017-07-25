import { BaseEntity } from './../../shared';

export class BenchHistory implements BaseEntity {
    constructor(
        public id?: number,
        public createdTime?: any,
        public bench?: boolean,
        public managerId?: string,
        public validTo?: any,
        public createdByUpsaId?: string,
        public changedByUpsaId?: string,
        public employee?: BaseEntity,
    ) {
        this.bench = false;
    }
}
