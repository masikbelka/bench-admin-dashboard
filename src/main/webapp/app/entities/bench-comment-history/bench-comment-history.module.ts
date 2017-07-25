import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    BenchCommentHistoryService,
    BenchCommentHistoryPopupService,
    BenchCommentHistoryComponent,
    BenchCommentHistoryDetailComponent,
    BenchCommentHistoryDialogComponent,
    BenchCommentHistoryPopupComponent,
    BenchCommentHistoryDeletePopupComponent,
    BenchCommentHistoryDeleteDialogComponent,
    benchCommentHistoryRoute,
    benchCommentHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...benchCommentHistoryRoute,
    ...benchCommentHistoryPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BenchCommentHistoryComponent,
        BenchCommentHistoryDetailComponent,
        BenchCommentHistoryDialogComponent,
        BenchCommentHistoryDeleteDialogComponent,
        BenchCommentHistoryPopupComponent,
        BenchCommentHistoryDeletePopupComponent,
    ],
    entryComponents: [
        BenchCommentHistoryComponent,
        BenchCommentHistoryDialogComponent,
        BenchCommentHistoryPopupComponent,
        BenchCommentHistoryDeleteDialogComponent,
        BenchCommentHistoryDeletePopupComponent,
    ],
    providers: [
        BenchCommentHistoryService,
        BenchCommentHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleBenchCommentHistoryModule {}
