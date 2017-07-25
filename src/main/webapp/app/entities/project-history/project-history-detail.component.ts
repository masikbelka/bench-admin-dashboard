import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProjectHistory } from './project-history.model';
import { ProjectHistoryService } from './project-history.service';

@Component({
    selector: 'jhi-project-history-detail',
    templateUrl: './project-history-detail.component.html'
})
export class ProjectHistoryDetailComponent implements OnInit, OnDestroy {

    projectHistory: ProjectHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projectHistoryService: ProjectHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjectHistories();
    }

    load(id) {
        this.projectHistoryService.find(id).subscribe((projectHistory) => {
            this.projectHistory = projectHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjectHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectHistoryListModification',
            (response) => this.load(this.projectHistory.id)
        );
    }
}
