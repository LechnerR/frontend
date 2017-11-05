import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Project } from './shared/project';

@Injectable()
export class ProjectSearchService {
  constructor (private http: Http) { }
  private Url = 'http://localhost:53627/api/'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  search(term: string): Promise<Project[]> {
/*    return this.http
              .get(`localhost:53627/api/Projects/title=${term}`, {headers: this.headers})
              .map(response => response.json() as Project[]);
    */
    return this.http
      .get(this.Url + 'Projects/title=' + term, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Project[]);
  }
}
