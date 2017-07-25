import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillingType } from './billing-type.model';
import { BillingTypePopupService } from './billing-type-popup.service';
import { BillingTypeService } from './billing-type.service';

@Component({
    selector: 'jhi-billing-type-dialog',
    templateUrl: './billing-type-dialog.component.html'
})
export class BillingTypeDialogComponent implements OnInit {

    billingType: BillingType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private billingTypeService: BillingTypeService,
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
        if (this.billingType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billingTypeService.update(this.billingType));
        } else {
            this.subscribeToSaveResponse(
                this.billingTypeService.create(this.billingType));
        }
    }

    private subscribeToSaveResponse(result: Observable<BillingType>) {
        result.subscribe((res: BillingType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BillingType) {
        this.eventManager.broadcast({ name: 'billingTypeListModification', content: 'OK'});
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
    selector: 'jhi-billing-type-popup',
    template: ''
})
export class BillingTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billingTypePopupService: BillingTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.billingTypePopupService
                    .open(BillingTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.billingTypePopupService
                    .open(BillingTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
