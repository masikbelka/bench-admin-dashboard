import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingConcept } from './billing-concept.model';
import { BillingConceptPopupService } from './billing-concept-popup.service';
import { BillingConceptService } from './billing-concept.service';

@Component({
    selector: 'jhi-billing-concept-delete-dialog',
    templateUrl: './billing-concept-delete-dialog.component.html'
})
export class BillingConceptDeleteDialogComponent {

    billingConcept: BillingConcept;

    constructor(
        private billingConceptService: BillingConceptService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billingConceptService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billingConceptListModification',
                content: 'Deleted an billingConcept'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-billing-concept-delete-popup',
    template: ''
})
export class BillingConceptDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billingConceptPopupService: BillingConceptPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.billingConceptPopupService
                .open(BillingConceptDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
