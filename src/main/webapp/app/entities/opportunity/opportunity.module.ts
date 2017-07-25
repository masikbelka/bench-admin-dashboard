import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    OpportunityService,
    OpportunityPopupService,
    OpportunityComponent,
    OpportunityDetailComponent,
    OpportunityDialogComponent,
    OpportunityPopupComponent,
    OpportunityDeletePopupComponent,
    OpportunityDeleteDialogComponent,
    opportunityRoute,
    opportunityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...opportunityRoute,
    ...opportunityPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OpportunityComponent,
        OpportunityDetailComponent,
        OpportunityDialogComponent,
        OpportunityDeleteDialogComponent,
        OpportunityPopupComponent,
        OpportunityDeletePopupComponent,
    ],
    entryComponents: [
        OpportunityComponent,
        OpportunityDialogComponent,
        OpportunityPopupComponent,
        OpportunityDeleteDialogComponent,
        OpportunityDeletePopupComponent,
    ],
    providers: [
        OpportunityService,
        OpportunityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleOpportunityModule {}
