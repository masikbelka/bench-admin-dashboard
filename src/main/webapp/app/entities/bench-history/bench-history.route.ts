import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BenchHistoryComponent } from './bench-history.component';
import { BenchHistoryDetailComponent } from './bench-history-detail.component';
import { BenchHistoryPopupComponent } from './bench-history-dialog.component';
import { BenchHistoryDeletePopupComponent } from './bench-history-delete-dialog.component';

import { Principal } from '../../shared';

export const benchHistoryRoute: Routes = [
    {
        path: 'bench-history',
        component: BenchHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bench-history/:id',
        component: BenchHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const benchHistoryPopupRoute: Routes = [
    {
        path: 'bench-history-new',
        component: BenchHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-history/:id/edit',
        component: BenchHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-history/:id/delete',
        component: BenchHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
