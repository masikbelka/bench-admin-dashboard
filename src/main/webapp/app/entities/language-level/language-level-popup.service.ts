import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevel } from './language-level.model';
import { LanguageLevelService } from './language-level.service';

@Injectable()
export class LanguageLevelPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private languageLevelService: LanguageLevelService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.languageLevelService.find(id).subscribe((languageLevel) => {
                this.languageLevelModalRef(component, languageLevel);
            });
        } else {
            return this.languageLevelModalRef(component, new LanguageLevel());
        }
    }

    languageLevelModalRef(component: Component, languageLevel: LanguageLevel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.languageLevel = languageLevel;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
