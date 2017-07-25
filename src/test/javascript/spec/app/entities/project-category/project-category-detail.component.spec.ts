/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjectCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/project-category/project-category-detail.component';
import { ProjectCategoryService } from '../../../../../../main/webapp/app/entities/project-category/project-category.service';
import { ProjectCategory } from '../../../../../../main/webapp/app/entities/project-category/project-category.model';

describe('Component Tests', () => {

    describe('ProjectCategory Management Detail Component', () => {
        let comp: ProjectCategoryDetailComponent;
        let fixture: ComponentFixture<ProjectCategoryDetailComponent>;
        let service: ProjectCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [ProjectCategoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProjectCategoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjectCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProjectCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.projectCategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
