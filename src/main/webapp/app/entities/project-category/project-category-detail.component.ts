import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProjectCategory } from './project-category.model';
import { ProjectCategoryService } from './project-category.service';

@Component({
    selector: 'jhi-project-category-detail',
    templateUrl: './project-category-detail.component.html'
})
export class ProjectCategoryDetailComponent implements OnInit, OnDestroy {

    projectCategory: ProjectCategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projectCategoryService: ProjectCategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjectCategories();
    }

    load(id) {
        this.projectCategoryService.find(id).subscribe((projectCategory) => {
            this.projectCategory = projectCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjectCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectCategoryListModification',
            (response) => this.load(this.projectCategory.id)
        );
    }
}
