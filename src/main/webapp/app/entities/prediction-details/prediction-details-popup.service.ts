import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PredictionDetails } from './prediction-details.model';
import { PredictionDetailsService } from './prediction-details.service';

@Injectable()
export class PredictionDetailsPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private predictionDetailsService: PredictionDetailsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.predictionDetailsService.find(id).subscribe((predictionDetails) => {
                if (predictionDetails.date) {
                    predictionDetails.date = {
                        year: predictionDetails.date.getFullYear(),
                        month: predictionDetails.date.getMonth() + 1,
                        day: predictionDetails.date.getDate()
                    };
                }
                this.predictionDetailsModalRef(component, predictionDetails);
            });
        } else {
            return this.predictionDetailsModalRef(component, new PredictionDetails());
        }
    }

    predictionDetailsModalRef(component: Component, predictionDetails: PredictionDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.predictionDetails = predictionDetails;
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
