/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PredictionDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/prediction-details/prediction-details-detail.component';
import { PredictionDetailsService } from '../../../../../../main/webapp/app/entities/prediction-details/prediction-details.service';
import { PredictionDetails } from '../../../../../../main/webapp/app/entities/prediction-details/prediction-details.model';

describe('Component Tests', () => {

    describe('PredictionDetails Management Detail Component', () => {
        let comp: PredictionDetailsDetailComponent;
        let fixture: ComponentFixture<PredictionDetailsDetailComponent>;
        let service: PredictionDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [PredictionDetailsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PredictionDetailsService,
                    JhiEventManager
                ]
            }).overrideTemplate(PredictionDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PredictionDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PredictionDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PredictionDetails(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.predictionDetails).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
