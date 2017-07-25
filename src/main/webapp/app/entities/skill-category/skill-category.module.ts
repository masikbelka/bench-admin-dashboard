import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    SkillCategoryService,
    SkillCategoryPopupService,
    SkillCategoryComponent,
    SkillCategoryDetailComponent,
    SkillCategoryDialogComponent,
    SkillCategoryPopupComponent,
    SkillCategoryDeletePopupComponent,
    SkillCategoryDeleteDialogComponent,
    skillCategoryRoute,
    skillCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skillCategoryRoute,
    ...skillCategoryPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SkillCategoryComponent,
        SkillCategoryDetailComponent,
        SkillCategoryDialogComponent,
        SkillCategoryDeleteDialogComponent,
        SkillCategoryPopupComponent,
        SkillCategoryDeletePopupComponent,
    ],
    entryComponents: [
        SkillCategoryComponent,
        SkillCategoryDialogComponent,
        SkillCategoryPopupComponent,
        SkillCategoryDeleteDialogComponent,
        SkillCategoryDeletePopupComponent,
    ],
    providers: [
        SkillCategoryService,
        SkillCategoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleSkillCategoryModule {}
