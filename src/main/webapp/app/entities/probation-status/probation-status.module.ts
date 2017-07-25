import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    ProbationStatusService,
    ProbationStatusPopupService,
    ProbationStatusComponent,
    ProbationStatusDetailComponent,
    ProbationStatusDialogComponent,
    ProbationStatusPopupComponent,
    ProbationStatusDeletePopupComponent,
    ProbationStatusDeleteDialogComponent,
    probationStatusRoute,
    probationStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...probationStatusRoute,
    ...probationStatusPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProbationStatusComponent,
        ProbationStatusDetailComponent,
        ProbationStatusDialogComponent,
        ProbationStatusDeleteDialogComponent,
        ProbationStatusPopupComponent,
        ProbationStatusDeletePopupComponent,
    ],
    entryComponents: [
        ProbationStatusComponent,
        ProbationStatusDialogComponent,
        ProbationStatusPopupComponent,
        ProbationStatusDeleteDialogComponent,
        ProbationStatusDeletePopupComponent,
    ],
    providers: [
        ProbationStatusService,
        ProbationStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleProbationStatusModule {}
