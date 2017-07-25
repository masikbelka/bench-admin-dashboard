import { BaseEntity } from './../../shared';

export class Unit implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
        public owner?: BaseEntity,
        public location?: BaseEntity,
        public skill?: BaseEntity,
        public parent?: BaseEntity,
        public children?: BaseEntity[],
    ) {
    }
}
