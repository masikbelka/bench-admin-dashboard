import { BaseEntity } from './../../shared';

export class SkillCategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public color?: string,
        public children?: BaseEntity[],
    ) {
    }
}
