import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { BenchPredictions } from './bench-predictions.model';
import { BenchPredictionsService } from './bench-predictions.service';

@Component({
    selector: 'jhi-bench-predictions-detail',
    templateUrl: './bench-predictions-detail.component.html'
})
export class BenchPredictionsDetailComponent implements OnInit, OnDestroy {

    benchPredictions: BenchPredictions;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private benchPredictionsService: BenchPredictionsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBenchPredictions();
    }

    load(id) {
        this.benchPredictionsService.find(id).subscribe((benchPredictions) => {
            this.benchPredictions = benchPredictions;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBenchPredictions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'benchPredictionsListModification',
            (response) => this.load(this.benchPredictions.id)
        );
    }
}
