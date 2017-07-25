import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OpportunityPosition } from './opportunity-position.model';
import { OpportunityPositionService } from './opportunity-position.service';

@Injectable()
export class OpportunityPositionPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private opportunityPositionService: OpportunityPositionService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.opportunityPositionService.find(id).subscribe((opportunityPosition) => {
                if (opportunityPosition.createdTime) {
                    opportunityPosition.createdTime = {
                        year: opportunityPosition.createdTime.getFullYear(),
                        month: opportunityPosition.createdTime.getMonth() + 1,
                        day: opportunityPosition.createdTime.getDate()
                    };
                }
                this.opportunityPositionModalRef(component, opportunityPosition);
            });
        } else {
            return this.opportunityPositionModalRef(component, new OpportunityPosition());
        }
    }

    opportunityPositionModalRef(component: Component, opportunityPosition: OpportunityPosition): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.opportunityPosition = opportunityPosition;
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
