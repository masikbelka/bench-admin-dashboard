import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BenchPredictions } from './bench-predictions.model';
import { BenchPredictionsPopupService } from './bench-predictions-popup.service';
import { BenchPredictionsService } from './bench-predictions.service';
import { PredictionDetails, PredictionDetailsService } from '../prediction-details';
import { Employee, EmployeeService } from '../employee';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bench-predictions-dialog',
    templateUrl: './bench-predictions-dialog.component.html'
})
export class BenchPredictionsDialogComponent implements OnInit {

    benchPredictions: BenchPredictions;
    authorities: any[];
    isSaving: boolean;

    details: PredictionDetails[];

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private benchPredictionsService: BenchPredictionsService,
        private predictionDetailsService: PredictionDetailsService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.predictionDetailsService
            .query({filter: 'benchpredictions-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.benchPredictions.details || !this.benchPredictions.details.id) {
                    this.details = res.json;
                } else {
                    this.predictionDetailsService
                        .find(this.benchPredictions.details.id)
                        .subscribe((subRes: PredictionDetails) => {
                            this.details = [subRes].concat(res.json);
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
        if (this.benchPredictions.id !== undefined) {
            this.subscribeToSaveResponse(
                this.benchPredictionsService.update(this.benchPredictions));
        } else {
            this.subscribeToSaveResponse(
                this.benchPredictionsService.create(this.benchPredictions));
        }
    }

    private subscribeToSaveResponse(result: Observable<BenchPredictions>) {
        result.subscribe((res: BenchPredictions) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BenchPredictions) {
        this.eventManager.broadcast({ name: 'benchPredictionsListModification', content: 'OK'});
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

    trackPredictionDetailsById(index: number, item: PredictionDetails) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bench-predictions-popup',
    template: ''
})
export class BenchPredictionsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchPredictionsPopupService: BenchPredictionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.benchPredictionsPopupService
                    .open(BenchPredictionsDialogComponent, params['id']);
            } else {
                this.modalRef = this.benchPredictionsPopupService
                    .open(BenchPredictionsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
