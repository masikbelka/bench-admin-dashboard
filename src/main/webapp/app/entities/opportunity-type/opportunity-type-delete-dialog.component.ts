import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OpportunityType } from './opportunity-type.model';
import { OpportunityTypePopupService } from './opportunity-type-popup.service';
import { OpportunityTypeService } from './opportunity-type.service';

@Component({
    selector: 'jhi-opportunity-type-delete-dialog',
    templateUrl: './opportunity-type-delete-dialog.component.html'
})
export class OpportunityTypeDeleteDialogComponent {

    opportunityType: OpportunityType;

    constructor(
        private opportunityTypeService: OpportunityTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opportunityTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opportunityTypeListModification',
                content: 'Deleted an opportunityType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opportunity-type-delete-popup',
    template: ''
})
export class OpportunityTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityTypePopupService: OpportunityTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.opportunityTypePopupService
                .open(OpportunityTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
