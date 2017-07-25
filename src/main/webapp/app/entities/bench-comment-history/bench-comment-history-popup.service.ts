import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BenchCommentHistory } from './bench-comment-history.model';
import { BenchCommentHistoryService } from './bench-comment-history.service';

@Injectable()
export class BenchCommentHistoryPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private benchCommentHistoryService: BenchCommentHistoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.benchCommentHistoryService.find(id).subscribe((benchCommentHistory) => {
                benchCommentHistory.changeTime = this.datePipe
                    .transform(benchCommentHistory.changeTime, 'yyyy-MM-ddThh:mm');
                this.benchCommentHistoryModalRef(component, benchCommentHistory);
            });
        } else {
            return this.benchCommentHistoryModalRef(component, new BenchCommentHistory());
        }
    }

    benchCommentHistoryModalRef(component: Component, benchCommentHistory: BenchCommentHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.benchCommentHistory = benchCommentHistory;
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
