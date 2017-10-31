import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;

  constructor (
    private router: Router,
    private projectService: ProjectService
  ) { }

  getProjects(): void {
    this.projectService
      .getProjects()
      .then(projects => this.projects = projects);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.projectService.create(title)
      .then(project => {
        this.projects.push(project);
        this.selectedProject = null;
      });
  }

  delete(project: Project): void {
    this.projectService
      .delete(project.id)
      .then(() => {
        this.projects = this.projects.filter(p => p !== project);
        if (this.selectedProject === project) { this.selectedProject = null; }
      });
  }

  ngOnInit(): void {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  gotoDetail(): void {
    this.router.navigate(['/project', this.selectedProject.id]);
  }

}
