import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProbationStatus } from './probation-status.model';
import { ProbationStatusService } from './probation-status.service';

@Component({
    selector: 'jhi-probation-status-detail',
    templateUrl: './probation-status-detail.component.html'
})
export class ProbationStatusDetailComponent implements OnInit, OnDestroy {

    probationStatus: ProbationStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private probationStatusService: ProbationStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProbationStatuses();
    }

    load(id) {
        this.probationStatusService.find(id).subscribe((probationStatus) => {
            this.probationStatus = probationStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProbationStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'probationStatusListModification',
            (response) => this.load(this.probationStatus.id)
        );
    }
}
