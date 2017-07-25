/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BillingConceptDetailComponent } from '../../../../../../main/webapp/app/entities/billing-concept/billing-concept-detail.component';
import { BillingConceptService } from '../../../../../../main/webapp/app/entities/billing-concept/billing-concept.service';
import { BillingConcept } from '../../../../../../main/webapp/app/entities/billing-concept/billing-concept.model';

describe('Component Tests', () => {

    describe('BillingConcept Management Detail Component', () => {
        let comp: BillingConceptDetailComponent;
        let fixture: ComponentFixture<BillingConceptDetailComponent>;
        let service: BillingConceptService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [BillingConceptDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BillingConceptService,
                    JhiEventManager
                ]
            }).overrideTemplate(BillingConceptDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingConceptDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingConceptService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BillingConcept(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.billingConcept).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
