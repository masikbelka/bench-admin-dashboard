import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BillingTypeComponent } from './billing-type.component';
import { BillingTypeDetailComponent } from './billing-type-detail.component';
import { BillingTypePopupComponent } from './billing-type-dialog.component';
import { BillingTypeDeletePopupComponent } from './billing-type-delete-dialog.component';

import { Principal } from '../../shared';

export const billingTypeRoute: Routes = [
    {
        path: 'billing-type',
        component: BillingTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'billing-type/:id',
        component: BillingTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingTypePopupRoute: Routes = [
    {
        path: 'billing-type-new',
        component: BillingTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-type/:id/edit',
        component: BillingTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-type/:id/delete',
        component: BillingTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
