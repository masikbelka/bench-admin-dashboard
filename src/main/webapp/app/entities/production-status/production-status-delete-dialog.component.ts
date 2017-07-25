import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductionStatus } from './production-status.model';
import { ProductionStatusPopupService } from './production-status-popup.service';
import { ProductionStatusService } from './production-status.service';

@Component({
    selector: 'jhi-production-status-delete-dialog',
    templateUrl: './production-status-delete-dialog.component.html'
})
export class ProductionStatusDeleteDialogComponent {

    productionStatus: ProductionStatus;

    constructor(
        private productionStatusService: ProductionStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productionStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productionStatusListModification',
                content: 'Deleted an productionStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-production-status-delete-popup',
    template: ''
})
export class ProductionStatusDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productionStatusPopupService: ProductionStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.productionStatusPopupService
                .open(ProductionStatusDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
