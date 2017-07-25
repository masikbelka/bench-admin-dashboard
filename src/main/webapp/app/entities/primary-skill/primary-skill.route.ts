import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PrimarySkillComponent } from './primary-skill.component';
import { PrimarySkillDetailComponent } from './primary-skill-detail.component';
import { PrimarySkillPopupComponent } from './primary-skill-dialog.component';
import { PrimarySkillDeletePopupComponent } from './primary-skill-delete-dialog.component';

import { Principal } from '../../shared';

export const primarySkillRoute: Routes = [
    {
        path: 'primary-skill',
        component: PrimarySkillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.primarySkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'primary-skill/:id',
        component: PrimarySkillDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.primarySkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const primarySkillPopupRoute: Routes = [
    {
        path: 'primary-skill-new',
        component: PrimarySkillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.primarySkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'primary-skill/:id/edit',
        component: PrimarySkillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.primarySkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'primary-skill/:id/delete',
        component: PrimarySkillDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'benchAdminConsoleApp.primarySkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
