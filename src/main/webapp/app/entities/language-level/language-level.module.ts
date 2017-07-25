import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    LanguageLevelService,
    LanguageLevelPopupService,
    LanguageLevelComponent,
    LanguageLevelDetailComponent,
    LanguageLevelDialogComponent,
    LanguageLevelPopupComponent,
    LanguageLevelDeletePopupComponent,
    LanguageLevelDeleteDialogComponent,
    languageLevelRoute,
    languageLevelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...languageLevelRoute,
    ...languageLevelPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LanguageLevelComponent,
        LanguageLevelDetailComponent,
        LanguageLevelDialogComponent,
        LanguageLevelDeleteDialogComponent,
        LanguageLevelPopupComponent,
        LanguageLevelDeletePopupComponent,
    ],
    entryComponents: [
        LanguageLevelComponent,
        LanguageLevelDialogComponent,
        LanguageLevelPopupComponent,
        LanguageLevelDeleteDialogComponent,
        LanguageLevelDeletePopupComponent,
    ],
    providers: [
        LanguageLevelService,
        LanguageLevelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleLanguageLevelModule {}
