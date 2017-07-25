import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OpportunityType } from './opportunity-type.model';
import { OpportunityTypePopupService } from './opportunity-type-popup.service';
import { OpportunityTypeService } from './opportunity-type.service';

@Component({
    selector: 'jhi-opportunity-type-dialog',
    templateUrl: './opportunity-type-dialog.component.html'
})
export class OpportunityTypeDialogComponent implements OnInit {

    opportunityType: OpportunityType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private opportunityTypeService: OpportunityTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.opportunityType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opportunityTypeService.update(this.opportunityType));
        } else {
            this.subscribeToSaveResponse(
                this.opportunityTypeService.create(this.opportunityType));
        }
    }

    private subscribeToSaveResponse(result: Observable<OpportunityType>) {
        result.subscribe((res: OpportunityType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OpportunityType) {
        this.eventManager.broadcast({ name: 'opportunityTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-opportunity-type-popup',
    template: ''
})
export class OpportunityTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityTypePopupService: OpportunityTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.opportunityTypePopupService
                    .open(OpportunityTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.opportunityTypePopupService
                    .open(OpportunityTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
