import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    OpportunityTypeService,
    OpportunityTypePopupService,
    OpportunityTypeComponent,
    OpportunityTypeDetailComponent,
    OpportunityTypeDialogComponent,
    OpportunityTypePopupComponent,
    OpportunityTypeDeletePopupComponent,
    OpportunityTypeDeleteDialogComponent,
    opportunityTypeRoute,
    opportunityTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...opportunityTypeRoute,
    ...opportunityTypePopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OpportunityTypeComponent,
        OpportunityTypeDetailComponent,
        OpportunityTypeDialogComponent,
        OpportunityTypeDeleteDialogComponent,
        OpportunityTypePopupComponent,
        OpportunityTypeDeletePopupComponent,
    ],
    entryComponents: [
        OpportunityTypeComponent,
        OpportunityTypeDialogComponent,
        OpportunityTypePopupComponent,
        OpportunityTypeDeleteDialogComponent,
        OpportunityTypeDeletePopupComponent,
    ],
    providers: [
        OpportunityTypeService,
        OpportunityTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleOpportunityTypeModule {}
