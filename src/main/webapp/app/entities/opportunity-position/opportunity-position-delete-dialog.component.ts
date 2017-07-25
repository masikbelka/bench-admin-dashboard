import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OpportunityPosition } from './opportunity-position.model';
import { OpportunityPositionPopupService } from './opportunity-position-popup.service';
import { OpportunityPositionService } from './opportunity-position.service';

@Component({
    selector: 'jhi-opportunity-position-delete-dialog',
    templateUrl: './opportunity-position-delete-dialog.component.html'
})
export class OpportunityPositionDeleteDialogComponent {

    opportunityPosition: OpportunityPosition;

    constructor(
        private opportunityPositionService: OpportunityPositionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opportunityPositionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opportunityPositionListModification',
                content: 'Deleted an opportunityPosition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opportunity-position-delete-popup',
    template: ''
})
export class OpportunityPositionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPositionPopupService: OpportunityPositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.opportunityPositionPopupService
                .open(OpportunityPositionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
