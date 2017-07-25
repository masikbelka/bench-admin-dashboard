import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BenchCommentHistory } from './bench-comment-history.model';
import { BenchCommentHistoryPopupService } from './bench-comment-history-popup.service';
import { BenchCommentHistoryService } from './bench-comment-history.service';

@Component({
    selector: 'jhi-bench-comment-history-delete-dialog',
    templateUrl: './bench-comment-history-delete-dialog.component.html'
})
export class BenchCommentHistoryDeleteDialogComponent {

    benchCommentHistory: BenchCommentHistory;

    constructor(
        private benchCommentHistoryService: BenchCommentHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.benchCommentHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'benchCommentHistoryListModification',
                content: 'Deleted an benchCommentHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bench-comment-history-delete-popup',
    template: ''
})
export class BenchCommentHistoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private benchCommentHistoryPopupService: BenchCommentHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.benchCommentHistoryPopupService
                .open(BenchCommentHistoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
