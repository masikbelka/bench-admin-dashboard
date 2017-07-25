import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OpportunityComponent } from './opportunity.component';
import { OpportunityDetailComponent } from './opportunity-detail.component';
import { OpportunityPopupComponent } from './opportunity-dialog.component';
import { OpportunityDeletePopupComponent } from './opportunity-delete-dialog.component';

import { Principal } from '../../shared';

export const opportunityRoute: Routes = [
    {
        path: 'opportunity',
        component: OpportunityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opportunity/:id',
        component: OpportunityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opportunityPopupRoute: Routes = [
    {
        path: 'opportunity-new',
        component: OpportunityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity/:id/edit',
        component: OpportunityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity/:id/delete',
        component: OpportunityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
