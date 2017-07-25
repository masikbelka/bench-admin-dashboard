import { BaseEntity } from './../../shared';

export class JobFunction implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
        public prefix?: string,
    ) {
    }
}
