import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProjectRole } from './project-role.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProjectRoleService {

    private resourceUrl = 'api/project-roles';

    constructor(private http: Http) { }

    create(projectRole: ProjectRole): Observable<ProjectRole> {
        const copy = this.convert(projectRole);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(projectRole: ProjectRole): Observable<ProjectRole> {
        const copy = this.convert(projectRole);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ProjectRole> {
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

    private convert(projectRole: ProjectRole): ProjectRole {
        const copy: ProjectRole = Object.assign({}, projectRole);
        return copy;
    }
}