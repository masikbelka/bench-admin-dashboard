import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { PrimarySkill } from './primary-skill.model';
import { PrimarySkillService } from './primary-skill.service';

@Component({
    selector: 'jhi-primary-skill-detail',
    templateUrl: './primary-skill-detail.component.html'
})
export class PrimarySkillDetailComponent implements OnInit, OnDestroy {

    primarySkill: PrimarySkill;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private primarySkillService: PrimarySkillService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrimarySkills();
    }

    load(id) {
        this.primarySkillService.find(id).subscribe((primarySkill) => {
            this.primarySkill = primarySkill;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrimarySkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'primarySkillListModification',
            (response) => this.load(this.primarySkill.id)
        );
    }
}
