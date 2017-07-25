import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductionStatusComponent } from './production-status.component';
import { ProductionStatusDetailComponent } from './production-status-detail.component';
import { ProductionStatusPopupComponent } from './production-status-dialog.component';
import { ProductionStatusDeletePopupComponent } from './production-status-delete-dialog.component';

import { Principal } from '../../shared';

export const productionStatusRoute: Routes = [
    {
        path: 'production-status',
        component: ProductionStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.productionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'production-status/:id',
        component: ProductionStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.productionStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productionStatusPopupRoute: Routes = [
    {
        path: 'production-status-new',
        component: ProductionStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.productionStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-status/:id/edit',
        component: ProductionStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.productionStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-status/:id/delete',
        component: ProductionStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.productionStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
