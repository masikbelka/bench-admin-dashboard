import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectRole } from './project-role.model';
import { ProjectRolePopupService } from './project-role-popup.service';
import { ProjectRoleService } from './project-role.service';

@Component({
    selector: 'jhi-project-role-delete-dialog',
    templateUrl: './project-role-delete-dialog.component.html'
})
export class ProjectRoleDeleteDialogComponent {

    projectRole: ProjectRole;

    constructor(
        private projectRoleService: ProjectRoleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectRoleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectRoleListModification',
                content: 'Deleted an projectRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-role-delete-popup',
    template: ''
})
export class ProjectRoleDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectRolePopupService: ProjectRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.projectRolePopupService
                .open(ProjectRoleDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
