import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkillCategory } from './skill-category.model';
import { SkillCategoryPopupService } from './skill-category-popup.service';
import { SkillCategoryService } from './skill-category.service';

@Component({
    selector: 'jhi-skill-category-dialog',
    templateUrl: './skill-category-dialog.component.html'
})
export class SkillCategoryDialogComponent implements OnInit {

    skillCategory: SkillCategory;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private skillCategoryService: SkillCategoryService,
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
        if (this.skillCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillCategoryService.update(this.skillCategory));
        } else {
            this.subscribeToSaveResponse(
                this.skillCategoryService.create(this.skillCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<SkillCategory>) {
        result.subscribe((res: SkillCategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SkillCategory) {
        this.eventManager.broadcast({ name: 'skillCategoryListModification', content: 'OK'});
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
    selector: 'jhi-skill-category-popup',
    template: ''
})
export class SkillCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillCategoryPopupService: SkillCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.skillCategoryPopupService
                    .open(SkillCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.skillCategoryPopupService
                    .open(SkillCategoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
