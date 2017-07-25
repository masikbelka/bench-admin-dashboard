import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    ProjectHistoryService,
    ProjectHistoryPopupService,
    ProjectHistoryComponent,
    ProjectHistoryDetailComponent,
    ProjectHistoryDialogComponent,
    ProjectHistoryPopupComponent,
    ProjectHistoryDeletePopupComponent,
    ProjectHistoryDeleteDialogComponent,
    projectHistoryRoute,
    projectHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectHistoryRoute,
    ...projectHistoryPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjectHistoryComponent,
        ProjectHistoryDetailComponent,
        ProjectHistoryDialogComponent,
        ProjectHistoryDeleteDialogComponent,
        ProjectHistoryPopupComponent,
        ProjectHistoryDeletePopupComponent,
    ],
    entryComponents: [
        ProjectHistoryComponent,
        ProjectHistoryDialogComponent,
        ProjectHistoryPopupComponent,
        ProjectHistoryDeleteDialogComponent,
        ProjectHistoryDeletePopupComponent,
    ],
    providers: [
        ProjectHistoryService,
        ProjectHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleProjectHistoryModule {}
