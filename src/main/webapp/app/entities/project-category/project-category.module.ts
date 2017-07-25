import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    ProjectCategoryService,
    ProjectCategoryPopupService,
    ProjectCategoryComponent,
    ProjectCategoryDetailComponent,
    ProjectCategoryDialogComponent,
    ProjectCategoryPopupComponent,
    ProjectCategoryDeletePopupComponent,
    ProjectCategoryDeleteDialogComponent,
    projectCategoryRoute,
    projectCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectCategoryRoute,
    ...projectCategoryPopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjectCategoryComponent,
        ProjectCategoryDetailComponent,
        ProjectCategoryDialogComponent,
        ProjectCategoryDeleteDialogComponent,
        ProjectCategoryPopupComponent,
        ProjectCategoryDeletePopupComponent,
    ],
    entryComponents: [
        ProjectCategoryComponent,
        ProjectCategoryDialogComponent,
        ProjectCategoryPopupComponent,
        ProjectCategoryDeleteDialogComponent,
        ProjectCategoryDeletePopupComponent,
    ],
    providers: [
        ProjectCategoryService,
        ProjectCategoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleProjectCategoryModule {}
