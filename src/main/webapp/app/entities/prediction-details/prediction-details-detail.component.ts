import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { PredictionDetails } from './prediction-details.model';
import { PredictionDetailsService } from './prediction-details.service';

@Component({
    selector: 'jhi-prediction-details-detail',
    templateUrl: './prediction-details-detail.component.html'
})
export class PredictionDetailsDetailComponent implements OnInit, OnDestroy {

    predictionDetails: PredictionDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private predictionDetailsService: PredictionDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPredictionDetails();
    }

    load(id) {
        this.predictionDetailsService.find(id).subscribe((predictionDetails) => {
            this.predictionDetails = predictionDetails;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPredictionDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'predictionDetailsListModification',
            (response) => this.load(this.predictionDetails.id)
        );
    }
}
