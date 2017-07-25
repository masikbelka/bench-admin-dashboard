import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { BenchCommentHistory } from './bench-comment-history.model';
import { BenchCommentHistoryService } from './bench-comment-history.service';

@Component({
    selector: 'jhi-bench-comment-history-detail',
    templateUrl: './bench-comment-history-detail.component.html'
})
export class BenchCommentHistoryDetailComponent implements OnInit, OnDestroy {

    benchCommentHistory: BenchCommentHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private benchCommentHistoryService: BenchCommentHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBenchCommentHistories();
    }

    load(id) {
        this.benchCommentHistoryService.find(id).subscribe((benchCommentHistory) => {
            this.benchCommentHistory = benchCommentHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBenchCommentHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'benchCommentHistoryListModification',
            (response) => this.load(this.benchCommentHistory.id)
        );
    }
}
