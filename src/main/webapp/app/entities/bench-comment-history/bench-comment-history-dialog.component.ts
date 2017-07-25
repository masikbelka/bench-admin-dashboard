import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BenchCommentHistory } from './bench-comment-history.model';
import { BenchCommentHistoryPopupService } from './bench-comment-history-popup.service';
import { BenchCommentHistoryService } from './bench-comment-history.service';
import { Employee, EmployeeService } from '../employee';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bench-comment-history-dialog',
    templateUrl: './bench-comment-history-dialog.component.html'
})
export class BenchCommentHistoryDialogComponent implements OnInit {

    benchCommentHistory: BenchCommentHistory;
    authorities: any[];
    isSaving: boolean;

    users: Employee[];

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private benchCommentHistoryService: BenchCommentHistoryService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.employeeService
            .query({filter: 'benchcommenthistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.benchCommentHistory.user || !this.benchCommentHistory.user.id) {
                    this.users = res.json;
                } else {
                    this.employeeService
                        .find(this.benchCommentHistory.user.id)
                        .subscribe((subRes: Employee) => {
                            this.users = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.benchCommentHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.benchCommentHistoryService.update(this.benchCommentHistory));
        } else {
            this.subscribeToSaveResponse(
                this.benchCommentHistoryService.create(this.benchCommentHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<BenchCommentHistory>) {
        result.subscribe((res: BenchCommentHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BenchCommentHistory) {
        this.eventManager.broadcast({ name: 'benchCommentHistoryListModification', content: 'OK'});
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

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bench-comment-history-popup',
    template: ''
})
export class BenchCommentHistoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchCommentHistoryPopupService: BenchCommentHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.benchCommentHistoryPopupService
                    .open(BenchCommentHistoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.benchCommentHistoryPopupService
                    .open(BenchCommentHistoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
