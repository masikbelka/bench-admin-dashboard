import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { JobExecution } from './job-execution.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JobExecutionService {

    private resourceUrl = 'api/job-executions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(jobExecution: JobExecution): Observable<JobExecution> {
        const copy = this.convert(jobExecution);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(jobExecution: JobExecution): Observable<JobExecution> {
        const copy = this.convert(jobExecution);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<JobExecution> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startTime = this.dateUtils
            .convertLocalDateFromServer(entity.startTime);
        entity.endTime = this.dateUtils
            .convertLocalDateFromServer(entity.endTime);
    }

    private convert(jobExecution: JobExecution): JobExecution {
        const copy: JobExecution = Object.assign({}, jobExecution);
        copy.startTime = this.dateUtils
            .convertLocalDateToServer(jobExecution.startTime);
        copy.endTime = this.dateUtils
            .convertLocalDateToServer(jobExecution.endTime);
        return copy;
    }
}
