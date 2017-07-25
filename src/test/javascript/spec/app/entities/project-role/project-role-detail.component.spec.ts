/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjectRoleDetailComponent } from '../../../../../../main/webapp/app/entities/project-role/project-role-detail.component';
import { ProjectRoleService } from '../../../../../../main/webapp/app/entities/project-role/project-role.service';
import { ProjectRole } from '../../../../../../main/webapp/app/entities/project-role/project-role.model';

describe('Component Tests', () => {

    describe('ProjectRole Management Detail Component', () => {
        let comp: ProjectRoleDetailComponent;
        let fixture: ComponentFixture<ProjectRoleDetailComponent>;
        let service: ProjectRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [ProjectRoleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProjectRoleService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjectRoleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectRoleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProjectRole(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.projectRole).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
