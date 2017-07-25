import { BaseEntity } from './../../shared';

export class ProductionStatus implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
