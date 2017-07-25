/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BillingTypeDetailComponent } from '../../../../../../main/webapp/app/entities/billing-type/billing-type-detail.component';
import { BillingTypeService } from '../../../../../../main/webapp/app/entities/billing-type/billing-type.service';
import { BillingType } from '../../../../../../main/webapp/app/entities/billing-type/billing-type.model';

describe('Component Tests', () => {

    describe('BillingType Management Detail Component', () => {
        let comp: BillingTypeDetailComponent;
        let fixture: ComponentFixture<BillingTypeDetailComponent>;
        let service: BillingTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [BillingTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BillingTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(BillingTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BillingType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.billingType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
