/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PrimarySkillDetailComponent } from '../../../../../../main/webapp/app/entities/primary-skill/primary-skill-detail.component';
import { PrimarySkillService } from '../../../../../../main/webapp/app/entities/primary-skill/primary-skill.service';
import { PrimarySkill } from '../../../../../../main/webapp/app/entities/primary-skill/primary-skill.model';

describe('Component Tests', () => {

    describe('PrimarySkill Management Detail Component', () => {
        let comp: PrimarySkillDetailComponent;
        let fixture: ComponentFixture<PrimarySkillDetailComponent>;
        let service: PrimarySkillService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [PrimarySkillDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PrimarySkillService,
                    JhiEventManager
                ]
            }).overrideTemplate(PrimarySkillDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrimarySkillDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrimarySkillService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PrimarySkill(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.primarySkill).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
