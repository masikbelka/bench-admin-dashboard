import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Title } from './title.model';
import { TitlePopupService } from './title-popup.service';
import { TitleService } from './title.service';

@Component({
    selector: 'jhi-title-dialog',
    templateUrl: './title-dialog.component.html'
})
export class TitleDialogComponent implements OnInit {

    title: Title;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private titleService: TitleService,
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
        if (this.title.id !== undefined) {
            this.subscribeToSaveResponse(
                this.titleService.update(this.title));
        } else {
            this.subscribeToSaveResponse(
                this.titleService.create(this.title));
        }
    }

    private subscribeToSaveResponse(result: Observable<Title>) {
        result.subscribe((res: Title) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Title) {
        this.eventManager.broadcast({ name: 'titleListModification', content: 'OK'});
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
    selector: 'jhi-title-popup',
    template: ''
})
export class TitlePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private titlePopupService: TitlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.titlePopupService
                    .open(TitleDialogComponent, params['id']);
            } else {
                this.modalRef = this.titlePopupService
                    .open(TitleDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
