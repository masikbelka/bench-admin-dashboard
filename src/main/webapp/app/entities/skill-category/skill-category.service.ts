import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SkillCategory } from './skill-category.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SkillCategoryService {

    private resourceUrl = 'api/skill-categories';

    constructor(private http: Http) { }

    create(skillCategory: SkillCategory): Observable<SkillCategory> {
        const copy = this.convert(skillCategory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(skillCategory: SkillCategory): Observable<SkillCategory> {
        const copy = this.convert(skillCategory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SkillCategory> {
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

    private convert(skillCategory: SkillCategory): SkillCategory {
        const copy: SkillCategory = Object.assign({}, skillCategory);
        return copy;
    }
}
