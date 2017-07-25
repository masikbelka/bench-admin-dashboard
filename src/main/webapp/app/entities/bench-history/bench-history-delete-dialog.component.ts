import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BenchHistory } from './bench-history.model';
import { BenchHistoryPopupService } from './bench-history-popup.service';
import { BenchHistoryService } from './bench-history.service';

@Component({
    selector: 'jhi-bench-history-delete-dialog',
    templateUrl: './bench-history-delete-dialog.component.html'
})
export class BenchHistoryDeleteDialogComponent {

    benchHistory: BenchHistory;

    constructor(
        private benchHistoryService: BenchHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.benchHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'benchHistoryListModification',
                content: 'Deleted an benchHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bench-history-delete-popup',
    template: ''
})
export class BenchHistoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchHistoryPopupService: BenchHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.benchHistoryPopupService
                .open(BenchHistoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
