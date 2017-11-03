export class Task_employee_assignment {
  id: number;
  task_id: number;
  employee_id: number;

  constructor(tid: number, eid: number) {
    this.task_id = tid;
    this.employee_id = eid;
  }
}
