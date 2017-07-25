import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PredictionDetails } from './prediction-details.model';
import { PredictionDetailsPopupService } from './prediction-details-popup.service';
import { PredictionDetailsService } from './prediction-details.service';

@Component({
    selector: 'jhi-prediction-details-delete-dialog',
    templateUrl: './prediction-details-delete-dialog.component.html'
})
export class PredictionDetailsDeleteDialogComponent {

    predictionDetails: PredictionDetails;

    constructor(
        private predictionDetailsService: PredictionDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.predictionDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'predictionDetailsListModification',
                content: 'Deleted an predictionDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prediction-details-delete-popup',
    template: ''
})
export class PredictionDetailsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private predictionDetailsPopupService: PredictionDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.predictionDetailsPopupService
                .open(PredictionDetailsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
