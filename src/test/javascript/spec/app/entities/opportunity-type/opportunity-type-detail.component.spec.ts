/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OpportunityTypeDetailComponent } from '../../../../../../main/webapp/app/entities/opportunity-type/opportunity-type-detail.component';
import { OpportunityTypeService } from '../../../../../../main/webapp/app/entities/opportunity-type/opportunity-type.service';
import { OpportunityType } from '../../../../../../main/webapp/app/entities/opportunity-type/opportunity-type.model';

describe('Component Tests', () => {

    describe('OpportunityType Management Detail Component', () => {
        let comp: OpportunityTypeDetailComponent;
        let fixture: ComponentFixture<OpportunityTypeDetailComponent>;
        let service: OpportunityTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [OpportunityTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OpportunityTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(OpportunityTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OpportunityType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.opportunityType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
