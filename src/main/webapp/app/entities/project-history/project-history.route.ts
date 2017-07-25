import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjectHistoryComponent } from './project-history.component';
import { ProjectHistoryDetailComponent } from './project-history-detail.component';
import { ProjectHistoryPopupComponent } from './project-history-dialog.component';
import { ProjectHistoryDeletePopupComponent } from './project-history-delete-dialog.component';

import { Principal } from '../../shared';

export const projectHistoryRoute: Routes = [
    {
        path: 'project-history',
        component: ProjectHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-history/:id',
        component: ProjectHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectHistoryPopupRoute: Routes = [
    {
        path: 'project-history-new',
        component: ProjectHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-history/:id/edit',
        component: ProjectHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-history/:id/delete',
        component: ProjectHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
