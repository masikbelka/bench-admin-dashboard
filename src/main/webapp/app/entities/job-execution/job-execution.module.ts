import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    JobExecutionService,
    JobExecutionPopupService,
    JobExecutionComponent,
    JobExecutionDetailComponent,
    JobExecutionDialogComponent,
    JobExecutionPopupComponent,
    JobExecutionDeletePopupComponent,
    JobExecutionDeleteDialogComponent,
    jobExecutionRoute,
    jobExecutionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobExecutionRoute,
    ...jobExecutionPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        JobExecutionComponent,
        JobExecutionDetailComponent,
        JobExecutionDialogComponent,
        JobExecutionDeleteDialogComponent,
        JobExecutionPopupComponent,
        JobExecutionDeletePopupComponent,
    ],
    entryComponents: [
        JobExecutionComponent,
        JobExecutionDialogComponent,
        JobExecutionPopupComponent,
        JobExecutionDeleteDialogComponent,
        JobExecutionDeletePopupComponent,
    ],
    providers: [
        JobExecutionService,
        JobExecutionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleJobExecutionModule {}
