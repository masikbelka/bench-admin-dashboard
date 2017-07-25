import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageLevel } from './language-level.model';
import { LanguageLevelPopupService } from './language-level-popup.service';
import { LanguageLevelService } from './language-level.service';

@Component({
    selector: 'jhi-language-level-delete-dialog',
    templateUrl: './language-level-delete-dialog.component.html'
})
export class LanguageLevelDeleteDialogComponent {

    languageLevel: LanguageLevel;

    constructor(
        private languageLevelService: LanguageLevelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageLevelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'languageLevelListModification',
                content: 'Deleted an languageLevel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-language-level-delete-popup',
    template: ''
})
export class LanguageLevelDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languageLevelPopupService: LanguageLevelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.languageLevelPopupService
                .open(LanguageLevelDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
