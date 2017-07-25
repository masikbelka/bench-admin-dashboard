import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProductionStatus } from './production-status.model';
import { ProductionStatusService } from './production-status.service';

@Component({
    selector: 'jhi-production-status-detail',
    templateUrl: './production-status-detail.component.html'
})
export class ProductionStatusDetailComponent implements OnInit, OnDestroy {

    productionStatus: ProductionStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productionStatusService: ProductionStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductionStatuses();
    }

    load(id) {
        this.productionStatusService.find(id).subscribe((productionStatus) => {
            this.productionStatus = productionStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductionStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productionStatusListModification',
            (response) => this.load(this.productionStatus.id)
        );
    }
}
