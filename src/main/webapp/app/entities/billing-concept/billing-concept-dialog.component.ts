import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillingConcept } from './billing-concept.model';
import { BillingConceptPopupService } from './billing-concept-popup.service';
import { BillingConceptService } from './billing-concept.service';

@Component({
    selector: 'jhi-billing-concept-dialog',
    templateUrl: './billing-concept-dialog.component.html'
})
export class BillingConceptDialogComponent implements OnInit {

    billingConcept: BillingConcept;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private billingConceptService: BillingConceptService,
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
        if (this.billingConcept.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billingConceptService.update(this.billingConcept));
        } else {
            this.subscribeToSaveResponse(
                this.billingConceptService.create(this.billingConcept));
        }
    }

    private subscribeToSaveResponse(result: Observable<BillingConcept>) {
        result.subscribe((res: BillingConcept) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BillingConcept) {
        this.eventManager.broadcast({ name: 'billingConceptListModification', content: 'OK'});
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
    selector: 'jhi-billing-concept-popup',
    template: ''
})
export class BillingConceptPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billingConceptPopupService: BillingConceptPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.billingConceptPopupService
                    .open(BillingConceptDialogComponent, params['id']);
            } else {
                this.modalRef = this.billingConceptPopupService
                    .open(BillingConceptDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
