import {Project} from './project';
import {ProjectTask} from './ProjectTask';

export class ProjectTaskCombination {
  project: Project;
  tasks: ProjectTask[];

  constructor(project: Project, tasks: ProjectTask[]) {
    this.project = project;
    this.tasks = tasks;
  }
}
