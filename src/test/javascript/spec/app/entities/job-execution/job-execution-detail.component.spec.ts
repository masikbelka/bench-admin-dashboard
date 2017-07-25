/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JobExecutionDetailComponent } from '../../../../../../main/webapp/app/entities/job-execution/job-execution-detail.component';
import { JobExecutionService } from '../../../../../../main/webapp/app/entities/job-execution/job-execution.service';
import { JobExecution } from '../../../../../../main/webapp/app/entities/job-execution/job-execution.model';

describe('Component Tests', () => {

    describe('JobExecution Management Detail Component', () => {
        let comp: JobExecutionDetailComponent;
        let fixture: ComponentFixture<JobExecutionDetailComponent>;
        let service: JobExecutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [JobExecutionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    JobExecutionService,
                    JhiEventManager
                ]
            }).overrideTemplate(JobExecutionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobExecutionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobExecutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new JobExecution(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.jobExecution).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
