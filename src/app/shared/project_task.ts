
export class Project_task {
  id: number;
  title: string;
  description: string;
  notice: string;
  deadline: Date;
  milestone: boolean;

  constructor(title: string, desc: string, notice: string, deadline: Date, milestone: boolean) {
    this.title = title;
    this.description = desc;
    this.notice = notice;
    this.deadline = deadline;
    this.milestone = milestone;
  }
}
