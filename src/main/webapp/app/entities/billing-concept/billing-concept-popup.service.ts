import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BillingConcept } from './billing-concept.model';
import { BillingConceptService } from './billing-concept.service';

@Injectable()
export class BillingConceptPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private billingConceptService: BillingConceptService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.billingConceptService.find(id).subscribe((billingConcept) => {
                this.billingConceptModalRef(component, billingConcept);
            });
        } else {
            return this.billingConceptModalRef(component, new BillingConcept());
        }
    }

    billingConceptModalRef(component: Component, billingConcept: BillingConcept): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.billingConcept = billingConcept;
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
