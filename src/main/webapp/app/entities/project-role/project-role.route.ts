import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjectRoleComponent } from './project-role.component';
import { ProjectRoleDetailComponent } from './project-role-detail.component';
import { ProjectRolePopupComponent } from './project-role-dialog.component';
import { ProjectRoleDeletePopupComponent } from './project-role-delete-dialog.component';

import { Principal } from '../../shared';

export const projectRoleRoute: Routes = [
    {
        path: 'project-role',
        component: ProjectRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-role/:id',
        component: ProjectRoleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectRolePopupRoute: Routes = [
    {
        path: 'project-role-new',
        component: ProjectRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-role/:id/edit',
        component: ProjectRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-role/:id/delete',
        component: ProjectRoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
