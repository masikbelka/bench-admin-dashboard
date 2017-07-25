import { BaseEntity } from './../../shared';

export class Title implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public name?: string,
    ) {
    }
}
