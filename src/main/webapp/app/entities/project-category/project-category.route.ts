import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjectCategoryComponent } from './project-category.component';
import { ProjectCategoryDetailComponent } from './project-category-detail.component';
import { ProjectCategoryPopupComponent } from './project-category-dialog.component';
import { ProjectCategoryDeletePopupComponent } from './project-category-delete-dialog.component';

import { Principal } from '../../shared';

export const projectCategoryRoute: Routes = [
    {
        path: 'project-category',
        component: ProjectCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-category/:id',
        component: ProjectCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectCategoryPopupRoute: Routes = [
    {
        path: 'project-category-new',
        component: ProjectCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-category/:id/edit',
        component: ProjectCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-category/:id/delete',
        component: ProjectCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.projectCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
