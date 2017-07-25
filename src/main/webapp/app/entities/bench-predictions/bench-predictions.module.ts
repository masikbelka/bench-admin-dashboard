import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    BenchPredictionsService,
    BenchPredictionsPopupService,
    BenchPredictionsComponent,
    BenchPredictionsDetailComponent,
    BenchPredictionsDialogComponent,
    BenchPredictionsPopupComponent,
    BenchPredictionsDeletePopupComponent,
    BenchPredictionsDeleteDialogComponent,
    benchPredictionsRoute,
    benchPredictionsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...benchPredictionsRoute,
    ...benchPredictionsPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BenchPredictionsComponent,
        BenchPredictionsDetailComponent,
        BenchPredictionsDialogComponent,
        BenchPredictionsDeleteDialogComponent,
        BenchPredictionsPopupComponent,
        BenchPredictionsDeletePopupComponent,
    ],
    entryComponents: [
        BenchPredictionsComponent,
        BenchPredictionsDialogComponent,
        BenchPredictionsPopupComponent,
        BenchPredictionsDeleteDialogComponent,
        BenchPredictionsDeletePopupComponent,
    ],
    providers: [
        BenchPredictionsService,
        BenchPredictionsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleBenchPredictionsModule {}
