import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Unit } from './unit.model';
import { UnitPopupService } from './unit-popup.service';
import { UnitService } from './unit.service';
import { Employee, EmployeeService } from '../employee';
import { Location, LocationService } from '../location';
import { PrimarySkill, PrimarySkillService } from '../primary-skill';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-unit-dialog',
    templateUrl: './unit-dialog.component.html'
})
export class UnitDialogComponent implements OnInit {

    unit: Unit;
    authorities: any[];
    isSaving: boolean;

    owners: Employee[];

    locations: Location[];

    skills: PrimarySkill[];

    units: Unit[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private unitService: UnitService,
        private employeeService: EmployeeService,
        private locationService: LocationService,
        private primarySkillService: PrimarySkillService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.employeeService
            .query({filter: 'unit-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.unit.owner || !this.unit.owner.id) {
                    this.owners = res.json;
                } else {
                    this.employeeService
                        .find(this.unit.owner.id)
                        .subscribe((subRes: Employee) => {
                            this.owners = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.locationService
            .query({filter: 'unit-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.unit.location || !this.unit.location.id) {
                    this.locations = res.json;
                } else {
                    this.locationService
                        .find(this.unit.location.id)
                        .subscribe((subRes: Location) => {
                            this.locations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.primarySkillService
            .query({filter: 'unit-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.unit.skill || !this.unit.skill.id) {
                    this.skills = res.json;
                } else {
                    this.primarySkillService
                        .find(this.unit.skill.id)
                        .subscribe((subRes: PrimarySkill) => {
                            this.skills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.unitService.query()
            .subscribe((res: ResponseWrapper) => { this.units = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.unit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.unitService.update(this.unit));
        } else {
            this.subscribeToSaveResponse(
                this.unitService.create(this.unit));
        }
    }

    private subscribeToSaveResponse(result: Observable<Unit>) {
        result.subscribe((res: Unit) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Unit) {
        this.eventManager.broadcast({ name: 'unitListModification', content: 'OK'});
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

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackPrimarySkillById(index: number, item: PrimarySkill) {
        return item.id;
    }

    trackUnitById(index: number, item: Unit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-unit-popup',
    template: ''
})
export class UnitPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unitPopupService: UnitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.unitPopupService
                    .open(UnitDialogComponent, params['id']);
            } else {
                this.modalRef = this.unitPopupService
                    .open(UnitDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
