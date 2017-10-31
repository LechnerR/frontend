import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Project } from './shared/project';

@Injectable()
export class ProjectSearchService {
  constructor (private http: Http) { }

  search(term: string): Observable<Project[]> {
    return this.http
              .get(`api/projects/?title=${term}`)
              .map(response => response.json() as Project[]);
  }
}
