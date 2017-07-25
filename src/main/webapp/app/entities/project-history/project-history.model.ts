import { BaseEntity } from './../../shared';

export class ProjectHistory implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public workload?: number,
        public employee?: BaseEntity,
        public role?: BaseEntity,
        public project?: BaseEntity,
    ) {
    }
}
