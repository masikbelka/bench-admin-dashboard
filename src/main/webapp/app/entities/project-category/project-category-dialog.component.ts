import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectCategory } from './project-category.model';
import { ProjectCategoryPopupService } from './project-category-popup.service';
import { ProjectCategoryService } from './project-category.service';

@Component({
    selector: 'jhi-project-category-dialog',
    templateUrl: './project-category-dialog.component.html'
})
export class ProjectCategoryDialogComponent implements OnInit {

    projectCategory: ProjectCategory;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private projectCategoryService: ProjectCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projectCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectCategoryService.update(this.projectCategory));
        } else {
            this.subscribeToSaveResponse(
                this.projectCategoryService.create(this.projectCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProjectCategory>) {
        result.subscribe((res: ProjectCategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProjectCategory) {
        this.eventManager.broadcast({ name: 'projectCategoryListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-project-category-popup',
    template: ''
})
export class ProjectCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectCategoryPopupService: ProjectCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.projectCategoryPopupService
                    .open(ProjectCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.projectCategoryPopupService
                    .open(ProjectCategoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
