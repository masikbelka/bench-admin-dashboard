import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { OpportunityPosition } from './opportunity-position.model';
import { OpportunityPositionService } from './opportunity-position.service';

@Component({
    selector: 'jhi-opportunity-position-detail',
    templateUrl: './opportunity-position-detail.component.html'
})
export class OpportunityPositionDetailComponent implements OnInit, OnDestroy {

    opportunityPosition: OpportunityPosition;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opportunityPositionService: OpportunityPositionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpportunityPositions();
    }

    load(id) {
        this.opportunityPositionService.find(id).subscribe((opportunityPosition) => {
            this.opportunityPosition = opportunityPosition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpportunityPositions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opportunityPositionListModification',
            (response) => this.load(this.opportunityPosition.id)
        );
    }
}
