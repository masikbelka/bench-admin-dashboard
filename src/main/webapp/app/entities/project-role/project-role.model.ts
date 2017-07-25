import { BaseEntity } from './../../shared';

export class ProjectRole implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
    ) {
    }
}
