import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    TitleService,
    TitlePopupService,
    TitleComponent,
    TitleDetailComponent,
    TitleDialogComponent,
    TitlePopupComponent,
    TitleDeletePopupComponent,
    TitleDeleteDialogComponent,
    titleRoute,
    titlePopupRoute,
} from './';

const ENTITY_STATES = [
    ...titleRoute,
    ...titlePopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TitleComponent,
        TitleDetailComponent,
        TitleDialogComponent,
        TitleDeleteDialogComponent,
        TitlePopupComponent,
        TitleDeletePopupComponent,
    ],
    entryComponents: [
        TitleComponent,
        TitleDialogComponent,
        TitlePopupComponent,
        TitleDeleteDialogComponent,
        TitleDeletePopupComponent,
    ],
    providers: [
        TitleService,
        TitlePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleTitleModule {}
