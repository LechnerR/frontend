import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../project.service';
import { Project } from '../shared/project';

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

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.projectService.update(this.project)
          .then(() => this.goBack());
    }
}
