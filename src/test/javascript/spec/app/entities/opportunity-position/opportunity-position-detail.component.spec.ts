/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OpportunityPositionDetailComponent } from '../../../../../../main/webapp/app/entities/opportunity-position/opportunity-position-detail.component';
import { OpportunityPositionService } from '../../../../../../main/webapp/app/entities/opportunity-position/opportunity-position.service';
import { OpportunityPosition } from '../../../../../../main/webapp/app/entities/opportunity-position/opportunity-position.model';

describe('Component Tests', () => {

    describe('OpportunityPosition Management Detail Component', () => {
        let comp: OpportunityPositionDetailComponent;
        let fixture: ComponentFixture<OpportunityPositionDetailComponent>;
        let service: OpportunityPositionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [OpportunityPositionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OpportunityPositionService,
                    JhiEventManager
                ]
            }).overrideTemplate(OpportunityPositionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityPositionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityPositionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OpportunityPosition(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.opportunityPosition).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
