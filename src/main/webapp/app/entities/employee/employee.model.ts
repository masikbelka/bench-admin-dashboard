import { BaseEntity } from './../../shared';

const enum Gender {
    'MALE',
    'FEMALE'
}

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public upsaId?: string,
        public email?: string,
        public fullName?: string,
        public comment?: string,
        public managerFullName?: string,
        public managerId?: string,
        public active?: boolean,
        public hireDate?: any,
        public availableFrom?: any,
        public gender?: Gender,
        public probation?: BaseEntity,
        public location?: BaseEntity,
        public primarySkill?: BaseEntity,
        public title?: BaseEntity,
        public englishLevel?: BaseEntity,
        public productionStatus?: BaseEntity,
        public jobFunction?: BaseEntity,
        public unit?: BaseEntity,
        public benchHistories?: BaseEntity[],
        public projectsWorkloads?: BaseEntity[],
        public opportunityPositions?: BaseEntity[],
        public predictions?: BaseEntity[],
    ) {
        this.active = false;
    }
}
