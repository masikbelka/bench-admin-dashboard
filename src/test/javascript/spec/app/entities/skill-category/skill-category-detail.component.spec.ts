/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SkillCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/skill-category/skill-category-detail.component';
import { SkillCategoryService } from '../../../../../../main/webapp/app/entities/skill-category/skill-category.service';
import { SkillCategory } from '../../../../../../main/webapp/app/entities/skill-category/skill-category.model';

describe('Component Tests', () => {

    describe('SkillCategory Management Detail Component', () => {
        let comp: SkillCategoryDetailComponent;
        let fixture: ComponentFixture<SkillCategoryDetailComponent>;
        let service: SkillCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [SkillCategoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SkillCategoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(SkillCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SkillCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.skillCategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
