import { Component, OnInit } from '@angular/core';
import { Project } from './shared/project';
import { ProjectService } from './project.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;

  constructor (private projectService: ProjectService) { }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }
}