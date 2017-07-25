import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectHistory } from './project-history.model';
import { ProjectHistoryPopupService } from './project-history-popup.service';
import { ProjectHistoryService } from './project-history.service';
import { Employee, EmployeeService } from '../employee';
import { ProjectRole, ProjectRoleService } from '../project-role';
import { Project, ProjectService } from '../project';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-project-history-dialog',
    templateUrl: './project-history-dialog.component.html'
})
export class ProjectHistoryDialogComponent implements OnInit {

    projectHistory: ProjectHistory;
    authorities: any[];
    isSaving: boolean;

    employees: Employee[];

    roles: ProjectRole[];

    projects: Project[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private projectHistoryService: ProjectHistoryService,
        private employeeService: EmployeeService,
        private projectRoleService: ProjectRoleService,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectRoleService
            .query({filter: 'projecthistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.projectHistory.role || !this.projectHistory.role.id) {
                    this.roles = res.json;
                } else {
                    this.projectRoleService
                        .find(this.projectHistory.role.id)
                        .subscribe((subRes: ProjectRole) => {
                            this.roles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectService
            .query({filter: 'projecthistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.projectHistory.project || !this.projectHistory.project.id) {
                    this.projects = res.json;
                } else {
                    this.projectService
                        .find(this.projectHistory.project.id)
                        .subscribe((subRes: Project) => {
                            this.projects = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projectHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectHistoryService.update(this.projectHistory));
        } else {
            this.subscribeToSaveResponse(
                this.projectHistoryService.create(this.projectHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProjectHistory>) {
        result.subscribe((res: ProjectHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProjectHistory) {
        this.eventManager.broadcast({ name: 'projectHistoryListModification', content: 'OK'});
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

    trackProjectRoleById(index: number, item: ProjectRole) {
        return item.id;
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-project-history-popup',
    template: ''
})
export class ProjectHistoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectHistoryPopupService: ProjectHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.projectHistoryPopupService
                    .open(ProjectHistoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.projectHistoryPopupService
                    .open(ProjectHistoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
