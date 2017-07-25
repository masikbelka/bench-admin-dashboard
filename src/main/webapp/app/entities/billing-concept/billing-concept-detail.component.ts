import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { BillingConcept } from './billing-concept.model';
import { BillingConceptService } from './billing-concept.service';

@Component({
    selector: 'jhi-billing-concept-detail',
    templateUrl: './billing-concept-detail.component.html'
})
export class BillingConceptDetailComponent implements OnInit, OnDestroy {

    billingConcept: BillingConcept;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billingConceptService: BillingConceptService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBillingConcepts();
    }

    load(id) {
        this.billingConceptService.find(id).subscribe((billingConcept) => {
            this.billingConcept = billingConcept;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillingConcepts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billingConceptListModification',
            (response) => this.load(this.billingConcept.id)
        );
    }
}
