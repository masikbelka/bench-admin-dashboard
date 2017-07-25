import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    JobFunctionService,
    JobFunctionPopupService,
    JobFunctionComponent,
    JobFunctionDetailComponent,
    JobFunctionDialogComponent,
    JobFunctionPopupComponent,
    JobFunctionDeletePopupComponent,
    JobFunctionDeleteDialogComponent,
    jobFunctionRoute,
    jobFunctionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobFunctionRoute,
    ...jobFunctionPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        JobFunctionComponent,
        JobFunctionDetailComponent,
        JobFunctionDialogComponent,
        JobFunctionDeleteDialogComponent,
        JobFunctionPopupComponent,
        JobFunctionDeletePopupComponent,
    ],
    entryComponents: [
        JobFunctionComponent,
        JobFunctionDialogComponent,
        JobFunctionPopupComponent,
        JobFunctionDeleteDialogComponent,
        JobFunctionDeletePopupComponent,
    ],
    providers: [
        JobFunctionService,
        JobFunctionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleJobFunctionModule {}
