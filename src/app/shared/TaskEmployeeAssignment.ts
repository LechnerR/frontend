export class TaskEmployeeAssignment {
  id: number;
  taskid: number;
  employeeid: number;

  constructor(id: number, tid: number, eid: number) {
    if (id !== -1) {
      this.id = id;
    }
    this.taskid = tid;
    this.employeeid = eid;
  }
}
