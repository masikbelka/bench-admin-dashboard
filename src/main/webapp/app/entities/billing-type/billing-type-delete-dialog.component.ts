import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingType } from './billing-type.model';
import { BillingTypePopupService } from './billing-type-popup.service';
import { BillingTypeService } from './billing-type.service';

@Component({
    selector: 'jhi-billing-type-delete-dialog',
    templateUrl: './billing-type-delete-dialog.component.html'
})
export class BillingTypeDeleteDialogComponent {

    billingType: BillingType;

    constructor(
        private billingTypeService: BillingTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billingTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billingTypeListModification',
                content: 'Deleted an billingType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-billing-type-delete-popup',
    template: ''
})
export class BillingTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billingTypePopupService: BillingTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.billingTypePopupService
                .open(BillingTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
