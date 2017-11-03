import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../project.service';
import { Project } from '../shared/project';
import { Task } from '../shared/task';
import { Milestone } from '../shared/milestone';
import { User } from '../shared/user';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
    project: Project;

    constructor (
      private projectService: ProjectService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.projectService.getProject(+params.get('id')))
        .subscribe(project => this.project = project);
    }

    deleteTask(task: Task): void {
      this.projectService
        .delete(task.id)
        .then(() => {
          this.project.tasks = this.project.tasks.filter(t => t !== task);
        });
        console.log(task.id);
    }

    // deleteMilestone(milestone: Milestone): void {
    //   this.projectService
    //     .delete(milestone.id)
    //     .then(() => {
    //       this.project.milestones = this.project.milestones.filter(ms => ms !== milestone);
    //     });
    // }

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.projectService.update(this.project)
          .then(() => this.goBack());
    }

    addAppointment(): void {

    }

    deleteAppointment(): void {

    }
}
