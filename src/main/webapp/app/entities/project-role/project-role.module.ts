import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BenchAdminConsoleSharedModule } from '../../shared';
import {
    ProjectRoleService,
    ProjectRolePopupService,
    ProjectRoleComponent,
    ProjectRoleDetailComponent,
    ProjectRoleDialogComponent,
    ProjectRolePopupComponent,
    ProjectRoleDeletePopupComponent,
    ProjectRoleDeleteDialogComponent,
    projectRoleRoute,
    projectRolePopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectRoleRoute,
    ...projectRolePopupRoute,
];

@NgModule({
    imports: [
        BenchAdminConsoleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjectRoleComponent,
        ProjectRoleDetailComponent,
        ProjectRoleDialogComponent,
        ProjectRoleDeleteDialogComponent,
        ProjectRolePopupComponent,
        ProjectRoleDeletePopupComponent,
    ],
    entryComponents: [
        ProjectRoleComponent,
        ProjectRoleDialogComponent,
        ProjectRolePopupComponent,
        ProjectRoleDeleteDialogComponent,
        ProjectRoleDeletePopupComponent,
    ],
    providers: [
        ProjectRoleService,
        ProjectRolePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BenchAdminConsoleProjectRoleModule {}
