import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    PredictionDetailsService,
    PredictionDetailsPopupService,
    PredictionDetailsComponent,
    PredictionDetailsDetailComponent,
    PredictionDetailsDialogComponent,
    PredictionDetailsPopupComponent,
    PredictionDetailsDeletePopupComponent,
    PredictionDetailsDeleteDialogComponent,
    predictionDetailsRoute,
    predictionDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...predictionDetailsRoute,
    ...predictionDetailsPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PredictionDetailsComponent,
        PredictionDetailsDetailComponent,
        PredictionDetailsDialogComponent,
        PredictionDetailsDeleteDialogComponent,
        PredictionDetailsPopupComponent,
        PredictionDetailsDeletePopupComponent,
    ],
    entryComponents: [
        PredictionDetailsComponent,
        PredictionDetailsDialogComponent,
        PredictionDetailsPopupComponent,
        PredictionDetailsDeleteDialogComponent,
        PredictionDetailsDeletePopupComponent,
    ],
    providers: [
        PredictionDetailsService,
        PredictionDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsolePredictionDetailsModule {}
