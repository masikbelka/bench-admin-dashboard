import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BillingConceptComponent } from './billing-concept.component';
import { BillingConceptDetailComponent } from './billing-concept-detail.component';
import { BillingConceptPopupComponent } from './billing-concept-dialog.component';
import { BillingConceptDeletePopupComponent } from './billing-concept-delete-dialog.component';

import { Principal } from '../../shared';

export const billingConceptRoute: Routes = [
    {
        path: 'billing-concept',
        component: BillingConceptComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingConcept.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'billing-concept/:id',
        component: BillingConceptDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingConcept.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingConceptPopupRoute: Routes = [
    {
        path: 'billing-concept-new',
        component: BillingConceptPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingConcept.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-concept/:id/edit',
        component: BillingConceptPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingConcept.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-concept/:id/delete',
        component: BillingConceptDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.billingConcept.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
