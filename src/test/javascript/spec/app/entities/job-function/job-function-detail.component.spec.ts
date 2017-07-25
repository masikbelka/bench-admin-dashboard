/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JobFunctionDetailComponent } from '../../../../../../main/webapp/app/entities/job-function/job-function-detail.component';
import { JobFunctionService } from '../../../../../../main/webapp/app/entities/job-function/job-function.service';
import { JobFunction } from '../../../../../../main/webapp/app/entities/job-function/job-function.model';

describe('Component Tests', () => {

    describe('JobFunction Management Detail Component', () => {
        let comp: JobFunctionDetailComponent;
        let fixture: ComponentFixture<JobFunctionDetailComponent>;
        let service: JobFunctionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [JobFunctionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    JobFunctionService,
                    JhiEventManager
                ]
            }).overrideTemplate(JobFunctionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobFunctionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobFunctionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new JobFunction(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.jobFunction).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
