import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProbationStatus } from './probation-status.model';
import { ProbationStatusPopupService } from './probation-status-popup.service';
import { ProbationStatusService } from './probation-status.service';

@Component({
    selector: 'jhi-probation-status-delete-dialog',
    templateUrl: './probation-status-delete-dialog.component.html'
})
export class ProbationStatusDeleteDialogComponent {

    probationStatus: ProbationStatus;

    constructor(
        private probationStatusService: ProbationStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.probationStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'probationStatusListModification',
                content: 'Deleted an probationStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-probation-status-delete-popup',
    template: ''
})
export class ProbationStatusDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private probationStatusPopupService: ProbationStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.probationStatusPopupService
                .open(ProbationStatusDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
