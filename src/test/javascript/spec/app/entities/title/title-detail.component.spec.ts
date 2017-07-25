/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TitleDetailComponent } from '../../../../../../main/webapp/app/entities/title/title-detail.component';
import { TitleService } from '../../../../../../main/webapp/app/entities/title/title.service';
import { Title } from '../../../../../../main/webapp/app/entities/title/title.model';

describe('Component Tests', () => {

    describe('Title Management Detail Component', () => {
        let comp: TitleDetailComponent;
        let fixture: ComponentFixture<TitleDetailComponent>;
        let service: TitleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [TitleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TitleService,
                    JhiEventManager
                ]
            }).overrideTemplate(TitleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TitleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TitleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Title(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.title).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
