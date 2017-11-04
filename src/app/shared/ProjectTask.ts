
export class ProjectTask {
  id: number;
  title: string;
  description: string;
  notice: string;
  deadline: Date;
  milestone: boolean
  project_id: number;

  constructor(id: number, title: string, description: string, notice: string, deadline: Date, milestone: boolean, project_id: number) {
    if (id !== -1) {
      this.id = id;
    }
    this.title = title;
    this.description = description;
    this.notice = notice;
    this.deadline = deadline;
    this.milestone = milestone;
    this.project_id = project_id;
  }
}
