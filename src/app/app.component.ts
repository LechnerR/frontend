import { Component, OnInit } from '@angular/core';
import { Project } from './shared/project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProjectService]
})

export class AppComponent implements OnInit {
  title = 'app';
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
