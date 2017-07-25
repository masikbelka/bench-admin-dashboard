import { BaseEntity } from './../../shared';

const enum JobResultStatus {
    'SUCCESS',
    'ERROR'
}

export class Job implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public enabled?: boolean,
        public sendEmail?: boolean,
        public email?: string,
        public lastStartTime?: any,
        public lastEndTime?: any,
        public lastResult?: JobResultStatus,
        public lastUser?: string,
        public executions?: BaseEntity[],
    ) {
        this.enabled = false;
        this.sendEmail = false;
    }
}
