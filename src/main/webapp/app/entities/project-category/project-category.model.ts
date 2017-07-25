import { BaseEntity } from './../../shared';

export class ProjectCategory implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
    ) {
    }
}
