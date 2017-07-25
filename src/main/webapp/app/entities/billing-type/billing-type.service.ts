import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BillingType } from './billing-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BillingTypeService {

    private resourceUrl = 'api/billing-types';

    constructor(private http: Http) { }

    create(billingType: BillingType): Observable<BillingType> {
        const copy = this.convert(billingType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(billingType: BillingType): Observable<BillingType> {
        const copy = this.convert(billingType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<BillingType> {
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

    private convert(billingType: BillingType): BillingType {
        const copy: BillingType = Object.assign({}, billingType);
        return copy;
    }
}
