import { BaseEntity } from './../../shared';

export class BenchCommentHistory implements BaseEntity {
    constructor(
        public id?: number,
        public changeTime?: any,
        public oldValue?: string,
        public newValue?: string,
        public user?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
