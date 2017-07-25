import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BenchPredictions } from './bench-predictions.model';
import { BenchPredictionsService } from './bench-predictions.service';

@Injectable()
export class BenchPredictionsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private benchPredictionsService: BenchPredictionsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.benchPredictionsService.find(id).subscribe((benchPredictions) => {
                benchPredictions.createdTime = this.datePipe
                    .transform(benchPredictions.createdTime, 'yyyy-MM-ddThh:mm');
                this.benchPredictionsModalRef(component, benchPredictions);
            });
        } else {
            return this.benchPredictionsModalRef(component, new BenchPredictions());
        }
    }

    benchPredictionsModalRef(component: Component, benchPredictions: BenchPredictions): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.benchPredictions = benchPredictions;
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
