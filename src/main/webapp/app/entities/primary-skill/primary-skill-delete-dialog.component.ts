import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrimarySkill } from './primary-skill.model';
import { PrimarySkillPopupService } from './primary-skill-popup.service';
import { PrimarySkillService } from './primary-skill.service';

@Component({
    selector: 'jhi-primary-skill-delete-dialog',
    templateUrl: './primary-skill-delete-dialog.component.html'
})
export class PrimarySkillDeleteDialogComponent {

    primarySkill: PrimarySkill;

    constructor(
        private primarySkillService: PrimarySkillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.primarySkillService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'primarySkillListModification',
                content: 'Deleted an primarySkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-primary-skill-delete-popup',
    template: ''
})
export class PrimarySkillDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private primarySkillPopupService: PrimarySkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.primarySkillPopupService
                .open(PrimarySkillDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
