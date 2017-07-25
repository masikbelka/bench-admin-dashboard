import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProbationStatusComponent } from './probation-status.component';
import { ProbationStatusDetailComponent } from './probation-status-detail.component';
import { ProbationStatusPopupComponent } from './probation-status-dialog.component';
import { ProbationStatusDeletePopupComponent } from './probation-status-delete-dialog.component';

import { Principal } from '../../shared';

export const probationStatusRoute: Routes = [
    {
        path: 'probation-status',
        component: ProbationStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.probationStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'probation-status/:id',
        component: ProbationStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.probationStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const probationStatusPopupRoute: Routes = [
    {
        path: 'probation-status-new',
        component: ProbationStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.probationStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'probation-status/:id/edit',
        component: ProbationStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.probationStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'probation-status/:id/delete',
        component: ProbationStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.probationStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
