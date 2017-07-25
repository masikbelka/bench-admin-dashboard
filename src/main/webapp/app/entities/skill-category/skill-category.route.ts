import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SkillCategoryComponent } from './skill-category.component';
import { SkillCategoryDetailComponent } from './skill-category-detail.component';
import { SkillCategoryPopupComponent } from './skill-category-dialog.component';
import { SkillCategoryDeletePopupComponent } from './skill-category-delete-dialog.component';

import { Principal } from '../../shared';

export const skillCategoryRoute: Routes = [
    {
        path: 'skill-category',
        component: SkillCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.skillCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'skill-category/:id',
        component: SkillCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.skillCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillCategoryPopupRoute: Routes = [
    {
        path: 'skill-category-new',
        component: SkillCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.skillCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill-category/:id/edit',
        component: SkillCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.skillCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill-category/:id/delete',
        component: SkillCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.skillCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
