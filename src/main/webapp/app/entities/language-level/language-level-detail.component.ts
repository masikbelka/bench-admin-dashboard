import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { LanguageLevel } from './language-level.model';
import { LanguageLevelService } from './language-level.service';

@Component({
    selector: 'jhi-language-level-detail',
    templateUrl: './language-level-detail.component.html'
})
export class LanguageLevelDetailComponent implements OnInit, OnDestroy {

    languageLevel: LanguageLevel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private languageLevelService: LanguageLevelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLanguageLevels();
    }

    load(id) {
        this.languageLevelService.find(id).subscribe((languageLevel) => {
            this.languageLevel = languageLevel;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLanguageLevels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'languageLevelListModification',
            (response) => this.load(this.languageLevel.id)
        );
    }
}
