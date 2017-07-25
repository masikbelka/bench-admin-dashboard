import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    ProductionStatusService,
    ProductionStatusPopupService,
    ProductionStatusComponent,
    ProductionStatusDetailComponent,
    ProductionStatusDialogComponent,
    ProductionStatusPopupComponent,
    ProductionStatusDeletePopupComponent,
    ProductionStatusDeleteDialogComponent,
    productionStatusRoute,
    productionStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productionStatusRoute,
    ...productionStatusPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductionStatusComponent,
        ProductionStatusDetailComponent,
        ProductionStatusDialogComponent,
        ProductionStatusDeleteDialogComponent,
        ProductionStatusPopupComponent,
        ProductionStatusDeletePopupComponent,
    ],
    entryComponents: [
        ProductionStatusComponent,
        ProductionStatusDialogComponent,
        ProductionStatusPopupComponent,
        ProductionStatusDeleteDialogComponent,
        ProductionStatusDeletePopupComponent,
    ],
    providers: [
        ProductionStatusService,
        ProductionStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleProductionStatusModule {}
