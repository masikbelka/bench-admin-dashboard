import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProbationStatus } from './probation-status.model';
import { ProbationStatusPopupService } from './probation-status-popup.service';
import { ProbationStatusService } from './probation-status.service';

@Component({
    selector: 'jhi-probation-status-dialog',
    templateUrl: './probation-status-dialog.component.html'
})
export class ProbationStatusDialogComponent implements OnInit {

    probationStatus: ProbationStatus;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private probationStatusService: ProbationStatusService,
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
        if (this.probationStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.probationStatusService.update(this.probationStatus));
        } else {
            this.subscribeToSaveResponse(
                this.probationStatusService.create(this.probationStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProbationStatus>) {
        result.subscribe((res: ProbationStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProbationStatus) {
        this.eventManager.broadcast({ name: 'probationStatusListModification', content: 'OK'});
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
    selector: 'jhi-probation-status-popup',
    template: ''
})
export class ProbationStatusPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private probationStatusPopupService: ProbationStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.probationStatusPopupService
                    .open(ProbationStatusDialogComponent, params['id']);
            } else {
                this.modalRef = this.probationStatusPopupService
                    .open(ProbationStatusDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
