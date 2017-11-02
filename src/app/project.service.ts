import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './shared/project';
import { Task } from './shared/task';

@Injectable()
export class ProjectService {

  private projectsUrl = 'api/projects'; // URL to web api
  // private projectsUrl = 'http://localhost:53627/api/Projects'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
  return this.http.get(this.projectsUrl)
             .toPromise()
             .then(response => response.json() as Project[])
             .catch(this.handleError);
}

  getProject(id: number): Promise<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    // const url = this.projectsUrl + '/' + project.id;

    return this.http
              .put(url, JSON.stringify(project), {headers: this.headers})
              .toPromise()
              .then(() => project)
              .catch(this.handleError);
  }

  create(project: Project): Promise<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify({project: project}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project)
      .catch(this.handleError);
  }

  // createTask(task: Task): Promise<Task> {
  //   return this.http
  //     .post(this.projectsUrl, JSON.stringify({task: task}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json() as Task)
  //     .catch(this.handleError);
  // }

  delete(id: number): Promise<void> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // only for demo
    return Promise.reject(error.message || error);
  }
}
