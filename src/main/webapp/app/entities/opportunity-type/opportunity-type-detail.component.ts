import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { OpportunityType } from './opportunity-type.model';
import { OpportunityTypeService } from './opportunity-type.service';

@Component({
    selector: 'jhi-opportunity-type-detail',
    templateUrl: './opportunity-type-detail.component.html'
})
export class OpportunityTypeDetailComponent implements OnInit, OnDestroy {

    opportunityType: OpportunityType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opportunityTypeService: OpportunityTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpportunityTypes();
    }

    load(id) {
        this.opportunityTypeService.find(id).subscribe((opportunityType) => {
            this.opportunityType = opportunityType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpportunityTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opportunityTypeListModification',
            (response) => this.load(this.opportunityType.id)
        );
    }
}
