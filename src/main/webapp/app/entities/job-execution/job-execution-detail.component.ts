import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { JobExecution } from './job-execution.model';
import { JobExecutionService } from './job-execution.service';

@Component({
    selector: 'jhi-job-execution-detail',
    templateUrl: './job-execution-detail.component.html'
})
export class JobExecutionDetailComponent implements OnInit, OnDestroy {

    jobExecution: JobExecution;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobExecutionService: JobExecutionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobExecutions();
    }

    load(id) {
        this.jobExecutionService.find(id).subscribe((jobExecution) => {
            this.jobExecution = jobExecution;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobExecutions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobExecutionListModification',
            (response) => this.load(this.jobExecution.id)
        );
    }
}
