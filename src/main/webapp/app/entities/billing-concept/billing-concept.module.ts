import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    BillingConceptService,
    BillingConceptPopupService,
    BillingConceptComponent,
    BillingConceptDetailComponent,
    BillingConceptDialogComponent,
    BillingConceptPopupComponent,
    BillingConceptDeletePopupComponent,
    BillingConceptDeleteDialogComponent,
    billingConceptRoute,
    billingConceptPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billingConceptRoute,
    ...billingConceptPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BillingConceptComponent,
        BillingConceptDetailComponent,
        BillingConceptDialogComponent,
        BillingConceptDeleteDialogComponent,
        BillingConceptPopupComponent,
        BillingConceptDeletePopupComponent,
    ],
    entryComponents: [
        BillingConceptComponent,
        BillingConceptDialogComponent,
        BillingConceptPopupComponent,
        BillingConceptDeleteDialogComponent,
        BillingConceptDeletePopupComponent,
    ],
    providers: [
        BillingConceptService,
        BillingConceptPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleBillingConceptModule {}
