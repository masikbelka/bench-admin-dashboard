import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { PrimarySkill } from './primary-skill.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PrimarySkillService {

    private resourceUrl = 'api/primary-skills';

    constructor(private http: Http) { }

    create(primarySkill: PrimarySkill): Observable<PrimarySkill> {
        const copy = this.convert(primarySkill);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(primarySkill: PrimarySkill): Observable<PrimarySkill> {
        const copy = this.convert(primarySkill);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<PrimarySkill> {
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

    private convert(primarySkill: PrimarySkill): PrimarySkill {
        const copy: PrimarySkill = Object.assign({}, primarySkill);
        return copy;
    }
}
