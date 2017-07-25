/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BenchCommentHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/bench-comment-history/bench-comment-history-detail.component';
import { BenchCommentHistoryService } from '../../../../../../main/webapp/app/entities/bench-comment-history/bench-comment-history.service';
import { BenchCommentHistory } from '../../../../../../main/webapp/app/entities/bench-comment-history/bench-comment-history.model';

describe('Component Tests', () => {

    describe('BenchCommentHistory Management Detail Component', () => {
        let comp: BenchCommentHistoryDetailComponent;
        let fixture: ComponentFixture<BenchCommentHistoryDetailComponent>;
        let service: BenchCommentHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [BenchCommentHistoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BenchCommentHistoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(BenchCommentHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BenchCommentHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BenchCommentHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BenchCommentHistory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.benchCommentHistory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
