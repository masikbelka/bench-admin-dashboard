import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    BenchHistoryService,
    BenchHistoryPopupService,
    BenchHistoryComponent,
    BenchHistoryDetailComponent,
    BenchHistoryDialogComponent,
    BenchHistoryPopupComponent,
    BenchHistoryDeletePopupComponent,
    BenchHistoryDeleteDialogComponent,
    benchHistoryRoute,
    benchHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...benchHistoryRoute,
    ...benchHistoryPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BenchHistoryComponent,
        BenchHistoryDetailComponent,
        BenchHistoryDialogComponent,
        BenchHistoryDeleteDialogComponent,
        BenchHistoryPopupComponent,
        BenchHistoryDeletePopupComponent,
    ],
    entryComponents: [
        BenchHistoryComponent,
        BenchHistoryDialogComponent,
        BenchHistoryPopupComponent,
        BenchHistoryDeleteDialogComponent,
        BenchHistoryDeletePopupComponent,
    ],
    providers: [
        BenchHistoryService,
        BenchHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleBenchHistoryModule {}
