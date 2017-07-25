/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProbationStatusDetailComponent } from '../../../../../../main/webapp/app/entities/probation-status/probation-status-detail.component';
import { ProbationStatusService } from '../../../../../../main/webapp/app/entities/probation-status/probation-status.service';
import { ProbationStatus } from '../../../../../../main/webapp/app/entities/probation-status/probation-status.model';

describe('Component Tests', () => {

    describe('ProbationStatus Management Detail Component', () => {
        let comp: ProbationStatusDetailComponent;
        let fixture: ComponentFixture<ProbationStatusDetailComponent>;
        let service: ProbationStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [ProbationStatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProbationStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProbationStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProbationStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProbationStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProbationStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.probationStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
