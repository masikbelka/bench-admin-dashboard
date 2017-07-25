import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Project } from './project.model';
import { ProjectPopupService } from './project-popup.service';
import { ProjectService } from './project.service';
import { BillingConcept, BillingConceptService } from '../billing-concept';
import { BillingType, BillingTypeService } from '../billing-type';
import { ProjectCategory, ProjectCategoryService } from '../project-category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-project-dialog',
    templateUrl: './project-dialog.component.html'
})
export class ProjectDialogComponent implements OnInit {

    project: Project;
    authorities: any[];
    isSaving: boolean;

    billingconcepts: BillingConcept[];

    billingtypes: BillingType[];

    categories: ProjectCategory[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private projectService: ProjectService,
        private billingConceptService: BillingConceptService,
        private billingTypeService: BillingTypeService,
        private projectCategoryService: ProjectCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.billingConceptService
            .query({filter: 'project-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.project.billingConcept || !this.project.billingConcept.id) {
                    this.billingconcepts = res.json;
                } else {
                    this.billingConceptService
                        .find(this.project.billingConcept.id)
                        .subscribe((subRes: BillingConcept) => {
                            this.billingconcepts = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.billingTypeService
            .query({filter: 'project-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.project.billingType || !this.project.billingType.id) {
                    this.billingtypes = res.json;
                } else {
                    this.billingTypeService
                        .find(this.project.billingType.id)
                        .subscribe((subRes: BillingType) => {
                            this.billingtypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectCategoryService
            .query({filter: 'project-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.project.category || !this.project.category.id) {
                    this.categories = res.json;
                } else {
                    this.projectCategoryService
                        .find(this.project.category.id)
                        .subscribe((subRes: ProjectCategory) => {
                            this.categories = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(
                this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<Project>) {
        result.subscribe((res: Project) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Project) {
        this.eventManager.broadcast({ name: 'projectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackBillingConceptById(index: number, item: BillingConcept) {
        return item.id;
    }

    trackBillingTypeById(index: number, item: BillingType) {
        return item.id;
    }

    trackProjectCategoryById(index: number, item: ProjectCategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-project-popup',
    template: ''
})
export class ProjectPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: ProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.projectPopupService
                    .open(ProjectDialogComponent, params['id']);
            } else {
                this.modalRef = this.projectPopupService
                    .open(ProjectDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
