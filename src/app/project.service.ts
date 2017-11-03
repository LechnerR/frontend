import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './shared/project';
import { Project_task } from './shared/project_task';
import { Employee } from './shared/employee';
import { Project_task_assignment } from './shared/project_task_assignment';
import { Task_employee_assignment } from './shared/task_employee_assignment';

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
    // const url = `${this.projectsUrl}/${id}`;
    const url = this.projectsUrl + '/' + id;
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

  createProject(project: Project): Promise<Project> {
    return this.http
      .post(this.projectsUrl, project, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project)
      .catch(this.handleError);
  }

  createTask(task: Project_task): Promise<Project_task> {
    return this.http
      .post(this.projectsUrl, task, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project_task)
      .catch(this.handleError);
  }

  createProjectTaskAssignment(projectTaskAssignment: Project_task_assignment): Promise<Project_task_assignment> {
    return this.http
      .post(this.projectsUrl, projectTaskAssignment, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project_task_assignment)
      .catch(this.handleError);
  }

  createUser(user: Employee): Promise<Employee> {
    return this.http
      .post(this.projectsUrl, user, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Employee)
      .catch(this.handleError);
  }

  createTaskEmployeeAssignment(taskEmployeeAssignment: Task_employee_assignment): Promise<Task_employee_assignment> {
    return this.http
      .post(this.projectsUrl, taskEmployeeAssignment, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Task_employee_assignment)
      .catch(this.handleError);
  }

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
