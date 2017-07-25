import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { JobFunctionComponent } from './job-function.component';
import { JobFunctionDetailComponent } from './job-function-detail.component';
import { JobFunctionPopupComponent } from './job-function-dialog.component';
import { JobFunctionDeletePopupComponent } from './job-function-delete-dialog.component';

import { Principal } from '../../shared';

export const jobFunctionRoute: Routes = [
    {
        path: 'job-function',
        component: JobFunctionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobFunction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-function/:id',
        component: JobFunctionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobFunction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobFunctionPopupRoute: Routes = [
    {
        path: 'job-function-new',
        component: JobFunctionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobFunction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-function/:id/edit',
        component: JobFunctionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobFunction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-function/:id/delete',
        component: JobFunctionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobFunction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
