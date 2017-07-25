import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BenchHistory } from './bench-history.model';
import { BenchHistoryPopupService } from './bench-history-popup.service';
import { BenchHistoryService } from './bench-history.service';
import { Employee, EmployeeService } from '../employee';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bench-history-dialog',
    templateUrl: './bench-history-dialog.component.html'
})
export class BenchHistoryDialogComponent implements OnInit {

    benchHistory: BenchHistory;
    authorities: any[];
    isSaving: boolean;

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private benchHistoryService: BenchHistoryService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.benchHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.benchHistoryService.update(this.benchHistory));
        } else {
            this.subscribeToSaveResponse(
                this.benchHistoryService.create(this.benchHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<BenchHistory>) {
        result.subscribe((res: BenchHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BenchHistory) {
        this.eventManager.broadcast({ name: 'benchHistoryListModification', content: 'OK'});
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
    selector: 'jhi-bench-history-popup',
    template: ''
})
export class BenchHistoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchHistoryPopupService: BenchHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.benchHistoryPopupService
                    .open(BenchHistoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.benchHistoryPopupService
                    .open(BenchHistoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
