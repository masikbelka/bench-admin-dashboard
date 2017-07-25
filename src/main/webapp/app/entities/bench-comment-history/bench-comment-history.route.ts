import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BenchCommentHistoryComponent } from './bench-comment-history.component';
import { BenchCommentHistoryDetailComponent } from './bench-comment-history-detail.component';
import { BenchCommentHistoryPopupComponent } from './bench-comment-history-dialog.component';
import { BenchCommentHistoryDeletePopupComponent } from './bench-comment-history-delete-dialog.component';

import { Principal } from '../../shared';

export const benchCommentHistoryRoute: Routes = [
    {
        path: 'bench-comment-history',
        component: BenchCommentHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchCommentHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bench-comment-history/:id',
        component: BenchCommentHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchCommentHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const benchCommentHistoryPopupRoute: Routes = [
    {
        path: 'bench-comment-history-new',
        component: BenchCommentHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchCommentHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-comment-history/:id/edit',
        component: BenchCommentHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchCommentHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bench-comment-history/:id/delete',
        component: BenchCommentHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.benchCommentHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
