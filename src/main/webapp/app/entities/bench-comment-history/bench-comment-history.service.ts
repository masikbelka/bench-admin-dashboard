import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { BenchCommentHistory } from './bench-comment-history.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BenchCommentHistoryService {

    private resourceUrl = 'api/bench-comment-histories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(benchCommentHistory: BenchCommentHistory): Observable<BenchCommentHistory> {
        const copy = this.convert(benchCommentHistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(benchCommentHistory: BenchCommentHistory): Observable<BenchCommentHistory> {
        const copy = this.convert(benchCommentHistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<BenchCommentHistory> {
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
        entity.changeTime = this.dateUtils
            .convertDateTimeFromServer(entity.changeTime);
    }

    private convert(benchCommentHistory: BenchCommentHistory): BenchCommentHistory {
        const copy: BenchCommentHistory = Object.assign({}, benchCommentHistory);

        copy.changeTime = this.dateUtils.toDate(benchCommentHistory.changeTime);
        return copy;
    }
}
