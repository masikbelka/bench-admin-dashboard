import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobFunction } from './job-function.model';
import { JobFunctionPopupService } from './job-function-popup.service';
import { JobFunctionService } from './job-function.service';

@Component({
    selector: 'jhi-job-function-delete-dialog',
    templateUrl: './job-function-delete-dialog.component.html'
})
export class JobFunctionDeleteDialogComponent {

    jobFunction: JobFunction;

    constructor(
        private jobFunctionService: JobFunctionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobFunctionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobFunctionListModification',
                content: 'Deleted an jobFunction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-function-delete-popup',
    template: ''
})
export class JobFunctionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobFunctionPopupService: JobFunctionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.jobFunctionPopupService
                .open(JobFunctionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
