export class Project_task_assignment {
  id: number;
  project_id: number;
  task_id: number;

  constructor(pid: number, tid: number) {
    this.project_id = pid;
    this.task_id = tid;
  }
}
