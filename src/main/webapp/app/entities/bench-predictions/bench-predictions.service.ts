import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { BenchPredictions } from './bench-predictions.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BenchPredictionsService {

    private resourceUrl = 'api/bench-predictions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(benchPredictions: BenchPredictions): Observable<BenchPredictions> {
        const copy = this.convert(benchPredictions);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(benchPredictions: BenchPredictions): Observable<BenchPredictions> {
        const copy = this.convert(benchPredictions);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<BenchPredictions> {
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
    }

    private convert(benchPredictions: BenchPredictions): BenchPredictions {
        const copy: BenchPredictions = Object.assign({}, benchPredictions);

        copy.createdTime = this.dateUtils.toDate(benchPredictions.createdTime);
        return copy;
    }
}
