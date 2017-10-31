import { Injectable } from '@angular/core';

import { Project } from './shared/project';
import { PROJECTS } from './shared/mock-projects';

@Injectable()
export class ProjectService {

  getProjects(): Promise<Project[]> {
    return Promise.resolve(PROJECTS);
  }

  getProject(id: number): Promise<Project> {
    return this.getProjects()
               .then(projects => projects.find(project => project.id === id));
  }
}
