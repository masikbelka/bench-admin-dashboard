import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OpportunityPosition } from './opportunity-position.model';
import { OpportunityPositionPopupService } from './opportunity-position-popup.service';
import { OpportunityPositionService } from './opportunity-position.service';
import { Opportunity, OpportunityService } from '../opportunity';
import { ProjectRole, ProjectRoleService } from '../project-role';
import { Employee, EmployeeService } from '../employee';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-opportunity-position-dialog',
    templateUrl: './opportunity-position-dialog.component.html'
})
export class OpportunityPositionDialogComponent implements OnInit {

    opportunityPosition: OpportunityPosition;
    authorities: any[];
    isSaving: boolean;

    opportunities: Opportunity[];

    roles: ProjectRole[];

    employees: Employee[];
    createdTimeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private opportunityPositionService: OpportunityPositionService,
        private opportunityService: OpportunityService,
        private projectRoleService: ProjectRoleService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.opportunityService.query()
            .subscribe((res: ResponseWrapper) => { this.opportunities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectRoleService
            .query({filter: 'opportunityposition-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.opportunityPosition.role || !this.opportunityPosition.role.id) {
                    this.roles = res.json;
                } else {
                    this.projectRoleService
                        .find(this.opportunityPosition.role.id)
                        .subscribe((subRes: ProjectRole) => {
                            this.roles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.opportunityPosition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opportunityPositionService.update(this.opportunityPosition));
        } else {
            this.subscribeToSaveResponse(
                this.opportunityPositionService.create(this.opportunityPosition));
        }
    }

    private subscribeToSaveResponse(result: Observable<OpportunityPosition>) {
        result.subscribe((res: OpportunityPosition) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OpportunityPosition) {
        this.eventManager.broadcast({ name: 'opportunityPositionListModification', content: 'OK'});
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

    trackOpportunityById(index: number, item: Opportunity) {
        return item.id;
    }

    trackProjectRoleById(index: number, item: ProjectRole) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-opportunity-position-popup',
    template: ''
})
export class OpportunityPositionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPositionPopupService: OpportunityPositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.opportunityPositionPopupService
                    .open(OpportunityPositionDialogComponent, params['id']);
            } else {
                this.modalRef = this.opportunityPositionPopupService
                    .open(OpportunityPositionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
