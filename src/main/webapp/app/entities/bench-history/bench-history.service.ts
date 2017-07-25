import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { BenchHistory } from './bench-history.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BenchHistoryService {

    private resourceUrl = 'api/bench-histories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(benchHistory: BenchHistory): Observable<BenchHistory> {
        const copy = this.convert(benchHistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(benchHistory: BenchHistory): Observable<BenchHistory> {
        const copy = this.convert(benchHistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<BenchHistory> {
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
            .convertDateTimeFromServer(entity.createdTime);
        entity.validTo = this.dateUtils
            .convertDateTimeFromServer(entity.validTo);
    }

    private convert(benchHistory: BenchHistory): BenchHistory {
        const copy: BenchHistory = Object.assign({}, benchHistory);

        copy.createdTime = this.dateUtils.toDate(benchHistory.createdTime);

        copy.validTo = this.dateUtils.toDate(benchHistory.validTo);
        return copy;
    }
}
