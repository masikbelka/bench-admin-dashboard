import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BillingConcept } from './billing-concept.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BillingConceptService {

    private resourceUrl = 'api/billing-concepts';

    constructor(private http: Http) { }

    create(billingConcept: BillingConcept): Observable<BillingConcept> {
        const copy = this.convert(billingConcept);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(billingConcept: BillingConcept): Observable<BillingConcept> {
        const copy = this.convert(billingConcept);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<BillingConcept> {
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

    private convert(billingConcept: BillingConcept): BillingConcept {
        const copy: BillingConcept = Object.assign({}, billingConcept);
        return copy;
    }
}
