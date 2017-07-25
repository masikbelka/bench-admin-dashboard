import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Opportunity } from './opportunity.model';
import { OpportunityPopupService } from './opportunity-popup.service';
import { OpportunityService } from './opportunity.service';

@Component({
    selector: 'jhi-opportunity-delete-dialog',
    templateUrl: './opportunity-delete-dialog.component.html'
})
export class OpportunityDeleteDialogComponent {

    opportunity: Opportunity;

    constructor(
        private opportunityService: OpportunityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opportunityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opportunityListModification',
                content: 'Deleted an opportunity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opportunity-delete-popup',
    template: ''
})
export class OpportunityDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPopupService: OpportunityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.opportunityPopupService
                .open(OpportunityDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
