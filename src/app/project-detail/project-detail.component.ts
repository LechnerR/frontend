import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Project } from '../shared/project';
import { ProjectService } from '../project/project.service';
import {ProjectTask} from '../shared/ProjectTask';
import {Employee} from '../shared/employee';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
    project: Project;
    tasks: ProjectTask[];
    employees: Employee[];

    constructor (
      private projectService: ProjectService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.projectService.getProject(+params.get('id')))
        .subscribe(project => {this.project = project});

      this.route.paramMap
        .switchMap((params: ParamMap) => this.projectService.getTasks(+params.get('id')))
        .subscribe(tasks => {this.tasks = tasks; this.tasks.sort((d1,d2) => d1['deadline'] < d2['deadline'] ? -1: d1['deadline'] > d2['deadline'] ? 1 : 0);});

      this.route.paramMap
        .switchMap((params: ParamMap) => this.projectService.getEmployees(+params.get('id')))
        .subscribe(employees => this.employees = employees);
      // this.projectService.getTasks(this.project.id).then(tasks => this.tasks = tasks)
      //   .catch(error => console.log('Task retrieve per Project hat nicht funktioniert'));
    }


  deleteTask(task: ProjectTask) {
    this.projectService.deleteTask(task.id).then(deletedTask => {
      this.tasks = this.tasks.filter(t => t !== task);
    });
  }

  deleteEmployee(employee: Employee) {
    this.projectService.deleteEmployee(employee.id).then(deletedEmployee => {
      this.employees = this.employees.filter(e => e !== employee);
    });
  }

}
