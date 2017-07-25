import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OpportunityTypeComponent } from './opportunity-type.component';
import { OpportunityTypeDetailComponent } from './opportunity-type-detail.component';
import { OpportunityTypePopupComponent } from './opportunity-type-dialog.component';
import { OpportunityTypeDeletePopupComponent } from './opportunity-type-delete-dialog.component';

import { Principal } from '../../shared';

export const opportunityTypeRoute: Routes = [
    {
        path: 'opportunity-type',
        component: OpportunityTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opportunity-type/:id',
        component: OpportunityTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opportunityTypePopupRoute: Routes = [
    {
        path: 'opportunity-type-new',
        component: OpportunityTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-type/:id/edit',
        component: OpportunityTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-type/:id/delete',
        component: OpportunityTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
