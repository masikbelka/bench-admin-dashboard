import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectHistory } from './project-history.model';
import { ProjectHistoryService } from './project-history.service';

@Injectable()
export class ProjectHistoryPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projectHistoryService: ProjectHistoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.projectHistoryService.find(id).subscribe((projectHistory) => {
                if (projectHistory.date) {
                    projectHistory.date = {
                        year: projectHistory.date.getFullYear(),
                        month: projectHistory.date.getMonth() + 1,
                        day: projectHistory.date.getDate()
                    };
                }
                this.projectHistoryModalRef(component, projectHistory);
            });
        } else {
            return this.projectHistoryModalRef(component, new ProjectHistory());
        }
    }

    projectHistoryModalRef(component: Component, projectHistory: ProjectHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.projectHistory = projectHistory;
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
