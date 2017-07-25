import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { OpportunityType } from './opportunity-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OpportunityTypeService {

    private resourceUrl = 'api/opportunity-types';

    constructor(private http: Http) { }

    create(opportunityType: OpportunityType): Observable<OpportunityType> {
        const copy = this.convert(opportunityType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(opportunityType: OpportunityType): Observable<OpportunityType> {
        const copy = this.convert(opportunityType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<OpportunityType> {
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

    private convert(opportunityType: OpportunityType): OpportunityType {
        const copy: OpportunityType = Object.assign({}, opportunityType);
        return copy;
    }
}
