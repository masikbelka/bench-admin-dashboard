import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { JobFunction } from './job-function.model';
import { JobFunctionService } from './job-function.service';

@Component({
    selector: 'jhi-job-function-detail',
    templateUrl: './job-function-detail.component.html'
})
export class JobFunctionDetailComponent implements OnInit, OnDestroy {

    jobFunction: JobFunction;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobFunctionService: JobFunctionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobFunctions();
    }

    load(id) {
        this.jobFunctionService.find(id).subscribe((jobFunction) => {
            this.jobFunction = jobFunction;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobFunctions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobFunctionListModification',
            (response) => this.load(this.jobFunction.id)
        );
    }
}
