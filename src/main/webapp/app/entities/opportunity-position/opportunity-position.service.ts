import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { OpportunityPosition } from './opportunity-position.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OpportunityPositionService {

    private resourceUrl = 'api/opportunity-positions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(opportunityPosition: OpportunityPosition): Observable<OpportunityPosition> {
        const copy = this.convert(opportunityPosition);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(opportunityPosition: OpportunityPosition): Observable<OpportunityPosition> {
        const copy = this.convert(opportunityPosition);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<OpportunityPosition> {
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
        entity.createdTime = this.dateUtils
            .convertLocalDateFromServer(entity.createdTime);
    }

    private convert(opportunityPosition: OpportunityPosition): OpportunityPosition {
        const copy: OpportunityPosition = Object.assign({}, opportunityPosition);
        copy.createdTime = this.dateUtils
            .convertLocalDateToServer(opportunityPosition.createdTime);
        return copy;
    }
}
