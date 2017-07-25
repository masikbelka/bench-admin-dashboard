import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProjectRole } from './project-role.model';
import { ProjectRoleService } from './project-role.service';

@Component({
    selector: 'jhi-project-role-detail',
    templateUrl: './project-role-detail.component.html'
})
export class ProjectRoleDetailComponent implements OnInit, OnDestroy {

    projectRole: ProjectRole;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projectRoleService: ProjectRoleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjectRoles();
    }

    load(id) {
        this.projectRoleService.find(id).subscribe((projectRole) => {
            this.projectRole = projectRole;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjectRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectRoleListModification',
            (response) => this.load(this.projectRole.id)
        );
    }
}
