/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OpportunityDetailComponent } from '../../../../../../main/webapp/app/entities/opportunity/opportunity-detail.component';
import { OpportunityService } from '../../../../../../main/webapp/app/entities/opportunity/opportunity.service';
import { Opportunity } from '../../../../../../main/webapp/app/entities/opportunity/opportunity.model';

describe('Component Tests', () => {

    describe('Opportunity Management Detail Component', () => {
        let comp: OpportunityDetailComponent;
        let fixture: ComponentFixture<OpportunityDetailComponent>;
        let service: OpportunityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [OpportunityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OpportunityService,
                    JhiEventManager
                ]
            }).overrideTemplate(OpportunityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Opportunity(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.opportunity).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
