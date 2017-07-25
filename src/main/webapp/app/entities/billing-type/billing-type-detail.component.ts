import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { BillingType } from './billing-type.model';
import { BillingTypeService } from './billing-type.service';

@Component({
    selector: 'jhi-billing-type-detail',
    templateUrl: './billing-type-detail.component.html'
})
export class BillingTypeDetailComponent implements OnInit, OnDestroy {

    billingType: BillingType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billingTypeService: BillingTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBillingTypes();
    }

    load(id) {
        this.billingTypeService.find(id).subscribe((billingType) => {
            this.billingType = billingType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillingTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billingTypeListModification',
            (response) => this.load(this.billingType.id)
        );
    }
}
