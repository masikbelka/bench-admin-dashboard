import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PredictionDetails } from './prediction-details.model';
import { PredictionDetailsPopupService } from './prediction-details-popup.service';
import { PredictionDetailsService } from './prediction-details.service';
import { Project, ProjectService } from '../project';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prediction-details-dialog',
    templateUrl: './prediction-details-dialog.component.html'
})
export class PredictionDetailsDialogComponent implements OnInit {

    predictionDetails: PredictionDetails;
    authorities: any[];
    isSaving: boolean;

    projects: Project[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private predictionDetailsService: PredictionDetailsService,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.projectService
            .query({filter: 'predictiondetails-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.predictionDetails.project || !this.predictionDetails.project.id) {
                    this.projects = res.json;
                } else {
                    this.projectService
                        .find(this.predictionDetails.project.id)
                        .subscribe((subRes: Project) => {
                            this.projects = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.predictionDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.predictionDetailsService.update(this.predictionDetails));
        } else {
            this.subscribeToSaveResponse(
                this.predictionDetailsService.create(this.predictionDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<PredictionDetails>) {
        result.subscribe((res: PredictionDetails) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PredictionDetails) {
        this.eventManager.broadcast({ name: 'predictionDetailsListModification', content: 'OK'});
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

    trackProjectById(index: number, item: Project) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prediction-details-popup',
    template: ''
})
export class PredictionDetailsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private predictionDetailsPopupService: PredictionDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.predictionDetailsPopupService
                    .open(PredictionDetailsDialogComponent, params['id']);
            } else {
                this.modalRef = this.predictionDetailsPopupService
                    .open(PredictionDetailsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
