import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProjectCategory } from './project-category.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProjectCategoryService {

    private resourceUrl = 'api/project-categories';

    constructor(private http: Http) { }

    create(projectCategory: ProjectCategory): Observable<ProjectCategory> {
        const copy = this.convert(projectCategory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(projectCategory: ProjectCategory): Observable<ProjectCategory> {
        const copy = this.convert(projectCategory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ProjectCategory> {
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

    private convert(projectCategory: ProjectCategory): ProjectCategory {
        const copy: ProjectCategory = Object.assign({}, projectCategory);
        return copy;
    }
}
