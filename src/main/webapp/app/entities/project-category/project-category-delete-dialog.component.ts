import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectCategory } from './project-category.model';
import { ProjectCategoryPopupService } from './project-category-popup.service';
import { ProjectCategoryService } from './project-category.service';

@Component({
    selector: 'jhi-project-category-delete-dialog',
    templateUrl: './project-category-delete-dialog.component.html'
})
export class ProjectCategoryDeleteDialogComponent {

    projectCategory: ProjectCategory;

    constructor(
        private projectCategoryService: ProjectCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectCategoryListModification',
                content: 'Deleted an projectCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-category-delete-popup',
    template: ''
})
export class ProjectCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectCategoryPopupService: ProjectCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.projectCategoryPopupService
                .open(ProjectCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
