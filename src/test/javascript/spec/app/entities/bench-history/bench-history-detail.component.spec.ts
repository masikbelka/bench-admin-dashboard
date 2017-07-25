/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BenchHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/bench-history/bench-history-detail.component';
import { BenchHistoryService } from '../../../../../../main/webapp/app/entities/bench-history/bench-history.service';
import { BenchHistory } from '../../../../../../main/webapp/app/entities/bench-history/bench-history.model';

describe('Component Tests', () => {

    describe('BenchHistory Management Detail Component', () => {
        let comp: BenchHistoryDetailComponent;
        let fixture: ComponentFixture<BenchHistoryDetailComponent>;
        let service: BenchHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [BenchHistoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BenchHistoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(BenchHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BenchHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BenchHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BenchHistory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.benchHistory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
