import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillCategory } from './skill-category.model';
import { SkillCategoryPopupService } from './skill-category-popup.service';
import { SkillCategoryService } from './skill-category.service';

@Component({
    selector: 'jhi-skill-category-delete-dialog',
    templateUrl: './skill-category-delete-dialog.component.html'
})
export class SkillCategoryDeleteDialogComponent {

    skillCategory: SkillCategory;

    constructor(
        private skillCategoryService: SkillCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.skillCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skillCategoryListModification',
                content: 'Deleted an skillCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skill-category-delete-popup',
    template: ''
})
export class SkillCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillCategoryPopupService: SkillCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.skillCategoryPopupService
                .open(SkillCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
