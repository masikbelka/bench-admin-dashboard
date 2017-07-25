import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BenchPredictionsComponent } from './bench-predictions.component';
import { BenchPredictionsDetailComponent } from './bench-predictions-detail.component';
import { BenchPredictionsPopupComponent } from './bench-predictions-dialog.component';
import { BenchPredictionsDeletePopupComponent } from './bench-predictions-delete-dialog.component';

import { Principal } from '../../shared';

export const benchPredictionsRoute: Routes = [
    {
        path: 'bench-predictions',
        component: BenchPredictionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchPredictions.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bench-predictions/:id',
        component: BenchPredictionsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchPredictions.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const benchPredictionsPopupRoute: Routes = [
    {
        path: 'bench-predictions-new',
        component: BenchPredictionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchPredictions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-predictions/:id/edit',
        component: BenchPredictionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchPredictions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-predictions/:id/delete',
        component: BenchPredictionsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchPredictions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
