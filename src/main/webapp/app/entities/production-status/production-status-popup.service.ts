import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductionStatus } from './production-status.model';
import { ProductionStatusService } from './production-status.service';

@Injectable()
export class ProductionStatusPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productionStatusService: ProductionStatusService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.productionStatusService.find(id).subscribe((productionStatus) => {
                this.productionStatusModalRef(component, productionStatus);
            });
        } else {
            return this.productionStatusModalRef(component, new ProductionStatus());
        }
    }

    productionStatusModalRef(component: Component, productionStatus: ProductionStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productionStatus = productionStatus;
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
