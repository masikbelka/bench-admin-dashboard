import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrimarySkill } from './primary-skill.model';
import { PrimarySkillPopupService } from './primary-skill-popup.service';
import { PrimarySkillService } from './primary-skill.service';
import { SkillCategory, SkillCategoryService } from '../skill-category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-primary-skill-dialog',
    templateUrl: './primary-skill-dialog.component.html'
})
export class PrimarySkillDialogComponent implements OnInit {

    primarySkill: PrimarySkill;
    authorities: any[];
    isSaving: boolean;

    skillcategories: SkillCategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private primarySkillService: PrimarySkillService,
        private skillCategoryService: SkillCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.skillCategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.skillcategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.primarySkill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.primarySkillService.update(this.primarySkill));
        } else {
            this.subscribeToSaveResponse(
                this.primarySkillService.create(this.primarySkill));
        }
    }

    private subscribeToSaveResponse(result: Observable<PrimarySkill>) {
        result.subscribe((res: PrimarySkill) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PrimarySkill) {
        this.eventManager.broadcast({ name: 'primarySkillListModification', content: 'OK'});
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

    trackSkillCategoryById(index: number, item: SkillCategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-primary-skill-popup',
    template: ''
})
export class PrimarySkillPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private primarySkillPopupService: PrimarySkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.primarySkillPopupService
                    .open(PrimarySkillDialogComponent, params['id']);
            } else {
                this.modalRef = this.primarySkillPopupService
                    .open(PrimarySkillDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
