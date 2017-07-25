/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BenchAdminConsoleTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LanguageLevelDetailComponent } from '../../../../../../main/webapp/app/entities/language-level/language-level-detail.component';
import { LanguageLevelService } from '../../../../../../main/webapp/app/entities/language-level/language-level.service';
import { LanguageLevel } from '../../../../../../main/webapp/app/entities/language-level/language-level.model';

describe('Component Tests', () => {

    describe('LanguageLevel Management Detail Component', () => {
        let comp: LanguageLevelDetailComponent;
        let fixture: ComponentFixture<LanguageLevelDetailComponent>;
        let service: LanguageLevelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BenchAdminConsoleTestModule],
                declarations: [LanguageLevelDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LanguageLevelService,
                    JhiEventManager
                ]
            }).overrideTemplate(LanguageLevelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LanguageLevelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageLevelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LanguageLevel(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.languageLevel).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
