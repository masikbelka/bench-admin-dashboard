import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { SkillCategory } from './skill-category.model';
import { SkillCategoryService } from './skill-category.service';

@Component({
    selector: 'jhi-skill-category-detail',
    templateUrl: './skill-category-detail.component.html'
})
export class SkillCategoryDetailComponent implements OnInit, OnDestroy {

    skillCategory: SkillCategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skillCategoryService: SkillCategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkillCategories();
    }

    load(id) {
        this.skillCategoryService.find(id).subscribe((skillCategory) => {
            this.skillCategory = skillCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkillCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skillCategoryListModification',
            (response) => this.load(this.skillCategory.id)
        );
    }
}
