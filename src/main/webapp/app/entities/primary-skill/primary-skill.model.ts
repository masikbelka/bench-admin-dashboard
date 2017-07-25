import { BaseEntity } from './../../shared';

export class PrimarySkill implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
        public skillCategory?: BaseEntity,
    ) {
    }
}
