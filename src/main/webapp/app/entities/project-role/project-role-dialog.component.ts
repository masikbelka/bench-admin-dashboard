import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectRole } from './project-role.model';
import { ProjectRolePopupService } from './project-role-popup.service';
import { ProjectRoleService } from './project-role.service';

@Component({
    selector: 'jhi-project-role-dialog',
    templateUrl: './project-role-dialog.component.html'
})
export class ProjectRoleDialogComponent implements OnInit {

    projectRole: ProjectRole;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private projectRoleService: ProjectRoleService,
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
        if (this.projectRole.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectRoleService.update(this.projectRole));
        } else {
            this.subscribeToSaveResponse(
                this.projectRoleService.create(this.projectRole));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProjectRole>) {
        result.subscribe((res: ProjectRole) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProjectRole) {
        this.eventManager.broadcast({ name: 'projectRoleListModification', content: 'OK'});
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
    selector: 'jhi-project-role-popup',
    template: ''
})
export class ProjectRolePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectRolePopupService: ProjectRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.projectRolePopupService
                    .open(ProjectRoleDialogComponent, params['id']);
            } else {
                this.modalRef = this.projectRolePopupService
                    .open(ProjectRoleDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
