import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UnitComponent } from './unit.component';
import { UnitDetailComponent } from './unit-detail.component';
import { UnitPopupComponent } from './unit-dialog.component';
import { UnitDeletePopupComponent } from './unit-delete-dialog.component';

import { Principal } from '../../shared';

export const unitRoute: Routes = [
    {
        path: 'unit',
        component: UnitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'unit/:id',
        component: UnitDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unitPopupRoute: Routes = [
    {
        path: 'unit-new',
        component: UnitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit/:id/edit',
        component: UnitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unit/:id/delete',
        component: UnitDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.unit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
