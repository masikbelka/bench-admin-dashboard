import { BaseEntity } from './../../shared';

export class BenchPredictions implements BaseEntity {
    constructor(
        public id?: number,
        public createdTime?: any,
        public ignored?: boolean,
        public ignoredDays?: boolean,
        public readyToBench?: boolean,
        public readyToProduction?: boolean,
        public details?: BaseEntity,
        public employee?: BaseEntity,
    ) {
        this.ignored = false;
        this.ignoredDays = false;
        this.readyToBench = false;
        this.readyToProduction = false;
    }
}
