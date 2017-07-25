import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    OpportunityPositionService,
    OpportunityPositionPopupService,
    OpportunityPositionComponent,
    OpportunityPositionDetailComponent,
    OpportunityPositionDialogComponent,
    OpportunityPositionPopupComponent,
    OpportunityPositionDeletePopupComponent,
    OpportunityPositionDeleteDialogComponent,
    opportunityPositionRoute,
    opportunityPositionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...opportunityPositionRoute,
    ...opportunityPositionPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OpportunityPositionComponent,
        OpportunityPositionDetailComponent,
        OpportunityPositionDialogComponent,
        OpportunityPositionDeleteDialogComponent,
        OpportunityPositionPopupComponent,
        OpportunityPositionDeletePopupComponent,
    ],
    entryComponents: [
        OpportunityPositionComponent,
        OpportunityPositionDialogComponent,
        OpportunityPositionPopupComponent,
        OpportunityPositionDeleteDialogComponent,
        OpportunityPositionDeletePopupComponent,
    ],
    providers: [
        OpportunityPositionService,
        OpportunityPositionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleOpportunityPositionModule {}
