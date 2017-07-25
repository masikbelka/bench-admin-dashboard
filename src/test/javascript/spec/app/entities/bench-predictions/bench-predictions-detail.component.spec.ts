/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BenchPredictionsDetailComponent } from '../../../../../../main/webapp/app/entities/bench-predictions/bench-predictions-detail.component';
import { BenchPredictionsService } from '../../../../../../main/webapp/app/entities/bench-predictions/bench-predictions.service';
import { BenchPredictions } from '../../../../../../main/webapp/app/entities/bench-predictions/bench-predictions.model';

describe('Component Tests', () => {

    describe('BenchPredictions Management Detail Component', () => {
        let comp: BenchPredictionsDetailComponent;
        let fixture: ComponentFixture<BenchPredictionsDetailComponent>;
        let service: BenchPredictionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [BenchPredictionsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BenchPredictionsService,
                    JhiEventManager
                ]
            }).overrideTemplate(BenchPredictionsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BenchPredictionsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BenchPredictionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BenchPredictions(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.benchPredictions).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
