import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
    selector: 'jhi-title-detail',
    templateUrl: './title-detail.component.html'
})
export class TitleDetailComponent implements OnInit, OnDestroy {

    title: Title;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private titleService: TitleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTitles();
    }

    load(id) {
        this.titleService.find(id).subscribe((title) => {
            this.title = title;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTitles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'titleListModification',
            (response) => this.load(this.title.id)
        );
    }
}
