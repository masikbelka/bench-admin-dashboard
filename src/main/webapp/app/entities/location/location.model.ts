import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
        public opportunity?: BaseEntity,
    ) {
    }
}
