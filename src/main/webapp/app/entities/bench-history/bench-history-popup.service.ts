import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BenchHistory } from './bench-history.model';
import { BenchHistoryService } from './bench-history.service';

@Injectable()
export class BenchHistoryPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private benchHistoryService: BenchHistoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.benchHistoryService.find(id).subscribe((benchHistory) => {
                benchHistory.createdTime = this.datePipe
                    .transform(benchHistory.createdTime, 'yyyy-MM-ddThh:mm');
                benchHistory.validTo = this.datePipe
                    .transform(benchHistory.validTo, 'yyyy-MM-ddThh:mm');
                this.benchHistoryModalRef(component, benchHistory);
            });
        } else {
            return this.benchHistoryModalRef(component, new BenchHistory());
        }
    }

    benchHistoryModalRef(component: Component, benchHistory: BenchHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.benchHistory = benchHistory;
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
