import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    BillingTypeService,
    BillingTypePopupService,
    BillingTypeComponent,
    BillingTypeDetailComponent,
    BillingTypeDialogComponent,
    BillingTypePopupComponent,
    BillingTypeDeletePopupComponent,
    BillingTypeDeleteDialogComponent,
    billingTypeRoute,
    billingTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...billingTypeRoute,
    ...billingTypePopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BillingTypeComponent,
        BillingTypeDetailComponent,
        BillingTypeDialogComponent,
        BillingTypeDeleteDialogComponent,
        BillingTypePopupComponent,
        BillingTypeDeletePopupComponent,
    ],
    entryComponents: [
        BillingTypeComponent,
        BillingTypeDialogComponent,
        BillingTypePopupComponent,
        BillingTypeDeleteDialogComponent,
        BillingTypeDeletePopupComponent,
    ],
    providers: [
        BillingTypeService,
        BillingTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleBillingTypeModule {}
