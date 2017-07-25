import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { BenchHistory } from './bench-history.model';
import { BenchHistoryService } from './bench-history.service';

@Component({
    selector: 'jhi-bench-history-detail',
    templateUrl: './bench-history-detail.component.html'
})
export class BenchHistoryDetailComponent implements OnInit, OnDestroy {

    benchHistory: BenchHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private benchHistoryService: BenchHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBenchHistories();
    }

    load(id) {
        this.benchHistoryService.find(id).subscribe((benchHistory) => {
            this.benchHistory = benchHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBenchHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'benchHistoryListModification',
            (response) => this.load(this.benchHistory.id)
        );
    }
}
