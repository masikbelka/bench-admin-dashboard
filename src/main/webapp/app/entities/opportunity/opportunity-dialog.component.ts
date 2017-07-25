import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Opportunity } from './opportunity.model';
import { OpportunityPopupService } from './opportunity-popup.service';
import { OpportunityService } from './opportunity.service';
import { OpportunityType, OpportunityTypeService } from '../opportunity-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-opportunity-dialog',
    templateUrl: './opportunity-dialog.component.html'
})
export class OpportunityDialogComponent implements OnInit {

    opportunity: Opportunity;
    authorities: any[];
    isSaving: boolean;

    types: OpportunityType[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private opportunityService: OpportunityService,
        private opportunityTypeService: OpportunityTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.opportunityTypeService
            .query({filter: 'opportunity-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.opportunity.type || !this.opportunity.type.id) {
                    this.types = res.json;
                } else {
                    this.opportunityTypeService
                        .find(this.opportunity.type.id)
                        .subscribe((subRes: OpportunityType) => {
                            this.types = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.opportunity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opportunityService.update(this.opportunity));
        } else {
            this.subscribeToSaveResponse(
                this.opportunityService.create(this.opportunity));
        }
    }

    private subscribeToSaveResponse(result: Observable<Opportunity>) {
        result.subscribe((res: Opportunity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Opportunity) {
        this.eventManager.broadcast({ name: 'opportunityListModification', content: 'OK'});
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

    trackOpportunityTypeById(index: number, item: OpportunityType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-opportunity-popup',
    template: ''
})
export class OpportunityPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPopupService: OpportunityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.opportunityPopupService
                    .open(OpportunityDialogComponent, params['id']);
            } else {
                this.modalRef = this.opportunityPopupService
                    .open(OpportunityDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
