import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProbationStatus } from './probation-status.model';
import { ProbationStatusService } from './probation-status.service';

@Injectable()
export class ProbationStatusPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private probationStatusService: ProbationStatusService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.probationStatusService.find(id).subscribe((probationStatus) => {
                probationStatus.endDate = this.datePipe
                    .transform(probationStatus.endDate, 'yyyy-MM-ddThh:mm');
                this.probationStatusModalRef(component, probationStatus);
            });
        } else {
            return this.probationStatusModalRef(component, new ProbationStatus());
        }
    }

    probationStatusModalRef(component: Component, probationStatus: ProbationStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.probationStatus = probationStatus;
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
