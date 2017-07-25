/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductionStatusDetailComponent } from '../../../../../../main/webapp/app/entities/production-status/production-status-detail.component';
import { ProductionStatusService } from '../../../../../../main/webapp/app/entities/production-status/production-status.service';
import { ProductionStatus } from '../../../../../../main/webapp/app/entities/production-status/production-status.model';

describe('Component Tests', () => {

    describe('ProductionStatus Management Detail Component', () => {
        let comp: ProductionStatusDetailComponent;
        let fixture: ComponentFixture<ProductionStatusDetailComponent>;
        let service: ProductionStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [ProductionStatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductionStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProductionStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductionStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.productionStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
