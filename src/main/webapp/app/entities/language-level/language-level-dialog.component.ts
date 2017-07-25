import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LanguageLevel } from './language-level.model';
import { LanguageLevelPopupService } from './language-level-popup.service';
import { LanguageLevelService } from './language-level.service';

@Component({
    selector: 'jhi-language-level-dialog',
    templateUrl: './language-level-dialog.component.html'
})
export class LanguageLevelDialogComponent implements OnInit {

    languageLevel: LanguageLevel;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private languageLevelService: LanguageLevelService,
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
        if (this.languageLevel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.languageLevelService.update(this.languageLevel));
        } else {
            this.subscribeToSaveResponse(
                this.languageLevelService.create(this.languageLevel));
        }
    }

    private subscribeToSaveResponse(result: Observable<LanguageLevel>) {
        result.subscribe((res: LanguageLevel) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LanguageLevel) {
        this.eventManager.broadcast({ name: 'languageLevelListModification', content: 'OK'});
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
    selector: 'jhi-language-level-popup',
    template: ''
})
export class LanguageLevelPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languageLevelPopupService: LanguageLevelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.languageLevelPopupService
                    .open(LanguageLevelDialogComponent, params['id']);
            } else {
                this.modalRef = this.languageLevelPopupService
                    .open(LanguageLevelDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
