import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobExecution } from './job-execution.model';
import { JobExecutionPopupService } from './job-execution-popup.service';
import { JobExecutionService } from './job-execution.service';
import { Job, JobService } from '../job';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-job-execution-dialog',
    templateUrl: './job-execution-dialog.component.html'
})
export class JobExecutionDialogComponent implements OnInit {

    jobExecution: JobExecution;
    authorities: any[];
    isSaving: boolean;

    jobs: Job[];
    startTimeDp: any;
    endTimeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private jobExecutionService: JobExecutionService,
        private jobService: JobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.jobService.query()
            .subscribe((res: ResponseWrapper) => { this.jobs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobExecution.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobExecutionService.update(this.jobExecution));
        } else {
            this.subscribeToSaveResponse(
                this.jobExecutionService.create(this.jobExecution));
        }
    }

    private subscribeToSaveResponse(result: Observable<JobExecution>) {
        result.subscribe((res: JobExecution) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: JobExecution) {
        this.eventManager.broadcast({ name: 'jobExecutionListModification', content: 'OK'});
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

    trackJobById(index: number, item: Job) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-execution-popup',
    template: ''
})
export class JobExecutionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobExecutionPopupService: JobExecutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.jobExecutionPopupService
                    .open(JobExecutionDialogComponent, params['id']);
            } else {
                this.modalRef = this.jobExecutionPopupService
                    .open(JobExecutionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
