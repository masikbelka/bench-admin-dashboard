import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PrimarySkill } from './primary-skill.model';
import { PrimarySkillService } from './primary-skill.service';

@Injectable()
export class PrimarySkillPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private primarySkillService: PrimarySkillService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.primarySkillService.find(id).subscribe((primarySkill) => {
                this.primarySkillModalRef(component, primarySkill);
            });
        } else {
            return this.primarySkillModalRef(component, new PrimarySkill());
        }
    }

    primarySkillModalRef(component: Component, primarySkill: PrimarySkill): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.primarySkill = primarySkill;
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
