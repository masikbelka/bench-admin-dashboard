import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Opportunity } from './opportunity.model';
import { OpportunityService } from './opportunity.service';

@Component({
    selector: 'jhi-opportunity-detail',
    templateUrl: './opportunity-detail.component.html'
})
export class OpportunityDetailComponent implements OnInit, OnDestroy {

    opportunity: Opportunity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opportunityService: OpportunityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpportunities();
    }

    load(id) {
        this.opportunityService.find(id).subscribe((opportunity) => {
            this.opportunity = opportunity;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpportunities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opportunityListModification',
            (response) => this.load(this.opportunity.id)
        );
    }
}
