import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobFunction } from './job-function.model';
import { JobFunctionPopupService } from './job-function-popup.service';
import { JobFunctionService } from './job-function.service';

@Component({
    selector: 'jhi-job-function-dialog',
    templateUrl: './job-function-dialog.component.html'
})
export class JobFunctionDialogComponent implements OnInit {

    jobFunction: JobFunction;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private jobFunctionService: JobFunctionService,
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
        if (this.jobFunction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobFunctionService.update(this.jobFunction));
        } else {
            this.subscribeToSaveResponse(
                this.jobFunctionService.create(this.jobFunction));
        }
    }

    private subscribeToSaveResponse(result: Observable<JobFunction>) {
        result.subscribe((res: JobFunction) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: JobFunction) {
        this.eventManager.broadcast({ name: 'jobFunctionListModification', content: 'OK'});
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
    selector: 'jhi-job-function-popup',
    template: ''
})
export class JobFunctionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobFunctionPopupService: JobFunctionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.jobFunctionPopupService
                    .open(JobFunctionDialogComponent, params['id']);
            } else {
                this.modalRef = this.jobFunctionPopupService
                    .open(JobFunctionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
