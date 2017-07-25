import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BenchPredictions } from './bench-predictions.model';
import { BenchPredictionsPopupService } from './bench-predictions-popup.service';
import { BenchPredictionsService } from './bench-predictions.service';

@Component({
    selector: 'jhi-bench-predictions-delete-dialog',
    templateUrl: './bench-predictions-delete-dialog.component.html'
})
export class BenchPredictionsDeleteDialogComponent {

    benchPredictions: BenchPredictions;

    constructor(
        private benchPredictionsService: BenchPredictionsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.benchPredictionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'benchPredictionsListModification',
                content: 'Deleted an benchPredictions'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bench-predictions-delete-popup',
    template: ''
})
export class BenchPredictionsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchPredictionsPopupService: BenchPredictionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.benchPredictionsPopupService
                .open(BenchPredictionsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
