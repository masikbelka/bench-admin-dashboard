import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employee } from './employee.model';
import { EmployeePopupService } from './employee-popup.service';
import { EmployeeService } from './employee.service';
import { ProbationStatus, ProbationStatusService } from '../probation-status';
import { Location, LocationService } from '../location';
import { PrimarySkill, PrimarySkillService } from '../primary-skill';
import { Title, TitleService } from '../title';
import { LanguageLevel, LanguageLevelService } from '../language-level';
import { ProductionStatus, ProductionStatusService } from '../production-status';
import { JobFunction, JobFunctionService } from '../job-function';
import { Unit, UnitService } from '../unit';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-employee-dialog',
    templateUrl: './employee-dialog.component.html'
})
export class EmployeeDialogComponent implements OnInit {

    employee: Employee;
    authorities: any[];
    isSaving: boolean;

    probations: ProbationStatus[];

    locations: Location[];

    primaryskills: PrimarySkill[];

    titles: Title[];

    englishlevels: LanguageLevel[];

    productionstatuses: ProductionStatus[];

    jobfunctions: JobFunction[];

    units: Unit[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private employeeService: EmployeeService,
        private probationStatusService: ProbationStatusService,
        private locationService: LocationService,
        private primarySkillService: PrimarySkillService,
        private titleService: TitleService,
        private languageLevelService: LanguageLevelService,
        private productionStatusService: ProductionStatusService,
        private jobFunctionService: JobFunctionService,
        private unitService: UnitService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.probationStatusService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.probation || !this.employee.probation.id) {
                    this.probations = res.json;
                } else {
                    this.probationStatusService
                        .find(this.employee.probation.id)
                        .subscribe((subRes: ProbationStatus) => {
                            this.probations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.locationService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.location || !this.employee.location.id) {
                    this.locations = res.json;
                } else {
                    this.locationService
                        .find(this.employee.location.id)
                        .subscribe((subRes: Location) => {
                            this.locations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.primarySkillService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.primarySkill || !this.employee.primarySkill.id) {
                    this.primaryskills = res.json;
                } else {
                    this.primarySkillService
                        .find(this.employee.primarySkill.id)
                        .subscribe((subRes: PrimarySkill) => {
                            this.primaryskills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.titleService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.title || !this.employee.title.id) {
                    this.titles = res.json;
                } else {
                    this.titleService
                        .find(this.employee.title.id)
                        .subscribe((subRes: Title) => {
                            this.titles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.languageLevelService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.englishLevel || !this.employee.englishLevel.id) {
                    this.englishlevels = res.json;
                } else {
                    this.languageLevelService
                        .find(this.employee.englishLevel.id)
                        .subscribe((subRes: LanguageLevel) => {
                            this.englishlevels = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.productionStatusService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.productionStatus || !this.employee.productionStatus.id) {
                    this.productionstatuses = res.json;
                } else {
                    this.productionStatusService
                        .find(this.employee.productionStatus.id)
                        .subscribe((subRes: ProductionStatus) => {
                            this.productionstatuses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.jobFunctionService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.jobFunction || !this.employee.jobFunction.id) {
                    this.jobfunctions = res.json;
                } else {
                    this.jobFunctionService
                        .find(this.employee.jobFunction.id)
                        .subscribe((subRes: JobFunction) => {
                            this.jobfunctions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.unitService
            .query({filter: 'employee-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employee.unit || !this.employee.unit.id) {
                    this.units = res.json;
                } else {
                    this.unitService
                        .find(this.employee.unit.id)
                        .subscribe((subRes: Unit) => {
                            this.units = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(
                this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<Employee>) {
        result.subscribe((res: Employee) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Employee) {
        this.eventManager.broadcast({ name: 'employeeListModification', content: 'OK'});
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

    trackProbationStatusById(index: number, item: ProbationStatus) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackPrimarySkillById(index: number, item: PrimarySkill) {
        return item.id;
    }

    trackTitleById(index: number, item: Title) {
        return item.id;
    }

    trackLanguageLevelById(index: number, item: LanguageLevel) {
        return item.id;
    }

    trackProductionStatusById(index: number, item: ProductionStatus) {
        return item.id;
    }

    trackJobFunctionById(index: number, item: JobFunction) {
        return item.id;
    }

    trackUnitById(index: number, item: Unit) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-employee-popup',
    template: ''
})
export class EmployeePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeePopupService: EmployeePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.employeePopupService
                    .open(EmployeeDialogComponent, params['id']);
            } else {
                this.modalRef = this.employeePopupService
                    .open(EmployeeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
