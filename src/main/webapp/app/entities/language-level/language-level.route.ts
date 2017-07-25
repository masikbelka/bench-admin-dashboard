import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LanguageLevelComponent } from './language-level.component';
import { LanguageLevelDetailComponent } from './language-level-detail.component';
import { LanguageLevelPopupComponent } from './language-level-dialog.component';
import { LanguageLevelDeletePopupComponent } from './language-level-delete-dialog.component';

import { Principal } from '../../shared';

export const languageLevelRoute: Routes = [
    {
        path: 'language-level',
        component: LanguageLevelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.languageLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'language-level/:id',
        component: LanguageLevelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.languageLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languageLevelPopupRoute: Routes = [
    {
        path: 'language-level-new',
        component: LanguageLevelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.languageLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'language-level/:id/edit',
        component: LanguageLevelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.languageLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'language-level/:id/delete',
        component: LanguageLevelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.languageLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
