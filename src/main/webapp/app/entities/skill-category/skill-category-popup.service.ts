import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SkillCategory } from './skill-category.model';
import { SkillCategoryService } from './skill-category.service';

@Injectable()
export class SkillCategoryPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private skillCategoryService: SkillCategoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.skillCategoryService.find(id).subscribe((skillCategory) => {
                this.skillCategoryModalRef(component, skillCategory);
            });
        } else {
            return this.skillCategoryModalRef(component, new SkillCategory());
        }
    }

    skillCategoryModalRef(component: Component, skillCategory: SkillCategory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.skillCategory = skillCategory;
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
