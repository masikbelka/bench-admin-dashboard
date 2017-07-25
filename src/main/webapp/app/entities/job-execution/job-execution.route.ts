import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { JobExecutionComponent } from './job-execution.component';
import { JobExecutionDetailComponent } from './job-execution-detail.component';
import { JobExecutionPopupComponent } from './job-execution-dialog.component';
import { JobExecutionDeletePopupComponent } from './job-execution-delete-dialog.component';

import { Principal } from '../../shared';

export const jobExecutionRoute: Routes = [
    {
        path: 'job-execution',
        component: JobExecutionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobExecution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-execution/:id',
        component: JobExecutionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobExecution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobExecutionPopupRoute: Routes = [
    {
        path: 'job-execution-new',
        component: JobExecutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobExecution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-execution/:id/edit',
        component: JobExecutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobExecution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-execution/:id/delete',
        component: JobExecutionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.jobExecution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
