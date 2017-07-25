import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PredictionDetailsComponent } from './prediction-details.component';
import { PredictionDetailsDetailComponent } from './prediction-details-detail.component';
import { PredictionDetailsPopupComponent } from './prediction-details-dialog.component';
import { PredictionDetailsDeletePopupComponent } from './prediction-details-delete-dialog.component';

import { Principal } from '../../shared';

export const predictionDetailsRoute: Routes = [
    {
        path: 'prediction-details',
        component: PredictionDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.predictionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prediction-details/:id',
        component: PredictionDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.predictionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const predictionDetailsPopupRoute: Routes = [
    {
        path: 'prediction-details-new',
        component: PredictionDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.predictionDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prediction-details/:id/edit',
        component: PredictionDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.predictionDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prediction-details/:id/delete',
        component: PredictionDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.predictionDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
