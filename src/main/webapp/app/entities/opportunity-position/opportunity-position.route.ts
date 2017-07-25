import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OpportunityPositionComponent } from './opportunity-position.component';
import { OpportunityPositionDetailComponent } from './opportunity-position-detail.component';
import { OpportunityPositionPopupComponent } from './opportunity-position-dialog.component';
import { OpportunityPositionDeletePopupComponent } from './opportunity-position-delete-dialog.component';

import { Principal } from '../../shared';

export const opportunityPositionRoute: Routes = [
    {
        path: 'opportunity-position',
        component: OpportunityPositionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opportunity-position/:id',
        component: OpportunityPositionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opportunityPositionPopupRoute: Routes = [
    {
        path: 'opportunity-position-new',
        component: OpportunityPositionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityPosition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-position/:id/edit',
        component: OpportunityPositionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityPosition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-position/:id/delete',
        component: OpportunityPositionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.opportunityPosition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
