import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectHistory } from './project-history.model';
import { ProjectHistoryPopupService } from './project-history-popup.service';
import { ProjectHistoryService } from './project-history.service';

@Component({
    selector: 'jhi-project-history-delete-dialog',
    templateUrl: './project-history-delete-dialog.component.html'
})
export class ProjectHistoryDeleteDialogComponent {

    projectHistory: ProjectHistory;

    constructor(
        private projectHistoryService: ProjectHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectHistoryListModification',
                content: 'Deleted an projectHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-history-delete-popup',
    template: ''
})
export class ProjectHistoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectHistoryPopupService: ProjectHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.projectHistoryPopupService
                .open(ProjectHistoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
