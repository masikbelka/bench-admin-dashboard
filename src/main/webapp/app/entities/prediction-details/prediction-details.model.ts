import { BaseEntity } from './../../shared';

export class PredictionDetails implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public assignedToProject?: boolean,
        public active?: boolean,
        public removedFromProject?: boolean,
        public maternityLeave?: boolean,
        public project?: BaseEntity,
    ) {
        this.assignedToProject = false;
        this.active = false;
        this.removedFromProject = false;
        this.maternityLeave = false;
    }
}
