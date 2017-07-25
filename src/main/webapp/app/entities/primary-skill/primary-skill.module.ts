import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    PrimarySkillService,
    PrimarySkillPopupService,
    PrimarySkillComponent,
    PrimarySkillDetailComponent,
    PrimarySkillDialogComponent,
    PrimarySkillPopupComponent,
    PrimarySkillDeletePopupComponent,
    PrimarySkillDeleteDialogComponent,
    primarySkillRoute,
    primarySkillPopupRoute,
} from './';

const ENTITY_STATES = [
    ...primarySkillRoute,
    ...primarySkillPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PrimarySkillComponent,
        PrimarySkillDetailComponent,
        PrimarySkillDialogComponent,
        PrimarySkillDeleteDialogComponent,
        PrimarySkillPopupComponent,
        PrimarySkillDeletePopupComponent,
    ],
    entryComponents: [
        PrimarySkillComponent,
        PrimarySkillDialogComponent,
        PrimarySkillPopupComponent,
        PrimarySkillDeleteDialogComponent,
        PrimarySkillDeletePopupComponent,
    ],
    providers: [
        PrimarySkillService,
        PrimarySkillPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsolePrimarySkillModule {}
