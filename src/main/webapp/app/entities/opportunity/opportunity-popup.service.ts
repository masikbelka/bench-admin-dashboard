import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Opportunity } from './opportunity.model';
import { OpportunityService } from './opportunity.service';

@Injectable()
export class OpportunityPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private opportunityService: OpportunityService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.opportunityService.find(id).subscribe((opportunity) => {
                if (opportunity.startDate) {
                    opportunity.startDate = {
                        year: opportunity.startDate.getFullYear(),
                        month: opportunity.startDate.getMonth() + 1,
                        day: opportunity.startDate.getDate()
                    };
                }
                if (opportunity.endDate) {
                    opportunity.endDate = {
                        year: opportunity.endDate.getFullYear(),
                        month: opportunity.endDate.getMonth() + 1,
                        day: opportunity.endDate.getDate()
                    };
                }
                this.opportunityModalRef(component, opportunity);
            });
        } else {
            return this.opportunityModalRef(component, new Opportunity());
        }
    }

    opportunityModalRef(component: Component, opportunity: Opportunity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.opportunity = opportunity;
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
