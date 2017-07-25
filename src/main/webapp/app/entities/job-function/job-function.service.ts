import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JobFunction } from './job-function.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JobFunctionService {

    private resourceUrl = 'api/job-functions';

    constructor(private http: Http) { }

    create(jobFunction: JobFunction): Observable<JobFunction> {
        const copy = this.convert(jobFunction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(jobFunction: JobFunction): Observable<JobFunction> {
        const copy = this.convert(jobFunction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<JobFunction> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(jobFunction: JobFunction): JobFunction {
        const copy: JobFunction = Object.assign({}, jobFunction);
        return copy;
    }
}
