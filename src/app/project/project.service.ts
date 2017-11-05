import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from '../shared/project';
import { ProjectTask } from '../shared/ProjectTask';
import { Employee } from '../shared/employee';
import { TaskEmployeeAssignment } from '../shared/TaskEmployeeAssignment';

@Injectable()
export class ProjectService {

  private Url = 'http://localhost:53628/api/'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
  return this.http.get(this.Url + 'Projects')
             .toPromise()
             .then(response => response.json() as Project[])
             .catch(this.handleError);
}


  getProject(id: number): Promise<Project> {
    // const url = `${this.projectsUrl}/${id}`;
    console.log('Jetzt kommt die Id');
    console.log(id);
    const url = this.Url + 'Projects/' + id;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  updateProject(project: Project): Promise<Project> {
    return this.http
      .put(this.Url + 'Projects/' + project.id, project, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project)
      .catch(this.handleError);
  }

  createProject(project: Project): Promise<Project> {
    return this.http
      .post(this.Url + 'Projects', project, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Project)
      .catch(this.handleError);
  }

  createTask(task: ProjectTask): Promise<ProjectTask> {
    return this.http
      .post(this.Url + 'ProjectTasks', task, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ProjectTask)
      .catch(this.handleError);
  }

  updateTask(task: ProjectTask): Promise<ProjectTask> {
    return this.http
      .put(this.Url + 'ProjectTasks/' + task.id, task, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ProjectTask)
      .catch(this.handleError);
  }

  createUser(user: Employee): Promise<Employee> {
    return this.http
      .post(this.Url + 'Employees', user, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Employee)
      .catch(this.handleError);
  }

  updateUser(user: Employee): Promise<Employee> {
    return this.http
      .put(this.Url + 'Employees/' + user.id, user, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Employee)
      .catch(this.handleError);
  }

  createTaskEmployeeAssignment(taskEmployeeAssignment: TaskEmployeeAssignment): Promise<TaskEmployeeAssignment> {
    return this.http
      .post(this.Url + 'TaskEmployeeAssignments', taskEmployeeAssignment, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as TaskEmployeeAssignment)
      .catch(this.handleError);
  }

  deleteProject(id: number) {
    const url = `${this.Url}/Projects/${id}`;
    return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Project)
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // only for demo
    return Promise.reject(error.message || error);
  }

  getTasks(id: number): Promise<ProjectTask[]> {
    const url = this.Url + 'ProjectTasks/project=' + id;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ProjectTask)
      .catch(this.handleError);
  }

  deleteTask(id: number) {
    const url = `${this.Url}/ProjectTasks/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as ProjectTask)
      .catch(this.handleError);

  }

  getEmployees(id: number): Promise<Employee[]> {
    const url = this.Url + 'Employees/project=' + id;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Employee)
      .catch(this.handleError);
  }

  deleteEmployee(id: number) {
    const url = `${this.Url}/Employees/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Employee)
      .catch(this.handleError);

  }

  getEmployeeAssignmentPerTask(id: number): Promise<TaskEmployeeAssignment[]> {
    const url = this.Url + 'TaskEmployeeAssignments/task=' + id;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TaskEmployeeAssignment)
      .catch(this.handleError);
  }
}
