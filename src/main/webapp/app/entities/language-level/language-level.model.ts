import { BaseEntity } from './../../shared';

export class LanguageLevel implements BaseEntity {
    constructor(
        public id?: number,
        public language?: string,
        public speaking?: string,
        public writing?: string,
    ) {
    }
}
