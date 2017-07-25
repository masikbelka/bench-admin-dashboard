import { BaseEntity } from './../../shared';

const enum JobResultStatus {
    'SUCCESS',
    'ERROR'
}

export class JobExecution implements BaseEntity {
    constructor(
        public id?: number,
        public startTime?: any,
        public endTime?: any,
        public result?: JobResultStatus,
        public user?: string,
        public job?: BaseEntity,
    ) {
    }
}
