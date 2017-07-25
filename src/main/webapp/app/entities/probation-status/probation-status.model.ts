import { BaseEntity } from './../../shared';

export class ProbationStatus implements BaseEntity {
    constructor(
        public id?: number,
        public endDate?: any,
        public status?: string,
    ) {
    }
}
