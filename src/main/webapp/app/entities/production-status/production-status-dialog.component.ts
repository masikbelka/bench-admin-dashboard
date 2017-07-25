import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductionStatus } from './production-status.model';
import { ProductionStatusPopupService } from './production-status-popup.service';
import { ProductionStatusService } from './production-status.service';

@Component({
    selector: 'jhi-production-status-dialog',
    templateUrl: './production-status-dialog.component.html'
})
export class ProductionStatusDialogComponent implements OnInit {

    productionStatus: ProductionStatus;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private productionStatusService: ProductionStatusService,
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
        if (this.productionStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productionStatusService.update(this.productionStatus));
        } else {
            this.subscribeToSaveResponse(
                this.productionStatusService.create(this.productionStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductionStatus>) {
        result.subscribe((res: ProductionStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProductionStatus) {
        this.eventManager.broadcast({ name: 'productionStatusListModification', content: 'OK'});
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
    selector: 'jhi-production-status-popup',
    template: ''
})
export class ProductionStatusPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionStatusPopupService: ProductionStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.productionStatusPopupService
                    .open(ProductionStatusDialogComponent, params['id']);
            } else {
                this.modalRef = this.productionStatusPopupService
                    .open(ProductionStatusDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
