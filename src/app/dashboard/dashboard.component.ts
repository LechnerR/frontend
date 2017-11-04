import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../shared/project';
import {ProjectTask} from '../shared/ProjectTask';
import { Employee } from '../shared/employee';
import { TaskEmployeeAssignment } from '../shared/TaskEmployeeAssignment';
import { ProjectService } from '../project/project.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ProjectTaskCombination} from '../shared/ProjectTaskCombination';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  project: Project;
  tasks: ProjectTask[] = [];
  task: ProjectTask;
  users: Employee[] = [];
  user: Employee;
  projectTaskCombination: ProjectTaskCombination[] = [];
  p: { start_date: Date, end_date: Date, description: string, title: string, notice: string };

  constructor (
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().then(projects => {
      this.projects = projects;
      if (this.projects != null) {
        for (const proj of this.projects) {
          this.projectService.getTasks(proj.id)
            .then(tasks => this.projectTaskCombination.push(new ProjectTaskCombination(proj, tasks)));
        }
      }
    });
  }

  delete(project: Project): void {
  this.projectService
      .deleteProject(project.id)
      .then(() => {
        this.projects = this.projects.filter(p => p !== project);
      });
}

  addProject(): void {
    this.p = {
      start_date: new Date(),
      end_date: null,
      title: '',
      description: '',
      notice: ''
    };
    const dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.p }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.p = result;
      if (!this.p) { return; }

        this.projectService.createProject(
          new Project(-1, this.p['start_date'], this.p['end_date'], this.p['title'], this.p['description'], this.p['notice']))
          .then(project => {
            this.projects.push(project);
            if (this.p['tasks']) {
              for (const t of this.p['tasks']) {
                this.projectService.createTask(
                  new ProjectTask(-1, t['title'], t['description'], t['notice'], t['deadline'], t['milestone'], project.id))
                  .then(task => {
                    if (t['user']) {
                      for (const u of t['user']) {
                        this.projectService.createUser(new Employee(-1, u['name'], u['email']))
                          .then(user => {
                            this.users.push(user);
                            const assignment = new TaskEmployeeAssignment(-1, task.id, user.id);
                            this.projectService.createTaskEmployeeAssignment(assignment);
                          });
                      }
                    }
                  });
              }
            }
          });
    });
  }

  updateProject(proj: Project): void {
    if (!proj) { return; }
    this.p = proj;
    const dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.p }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.p = result;
      if (!this.p) { return; }
      console.log()
      this.projectService.updateProject(
        new Project(this.p['id'], this.p['start_date'], this.p['end_date'], this.p['title'], this.p['description'], this.p['notice']))
        .then(project => {
          if (this.p['tasks']) {
            for (const t of this.p['tasks']) {
              this.projectService.updateTask(
                new ProjectTask(t['id'], t['title'], t['description'], t['notice'], t['deadline'], t['milestone'], project.id))
                .then(task => {
                  if (t['user']) {
                    for (const u of t['user']) {
                      this.projectService.updateUser(new Employee(u['id'], u['name'], u['email']))
                        .then(user => {
                          // get all assignments and check if task, employee assignment is equal, if not create it
                          this.projectService.getEmployeeAssignmentPerTask(task.id)
                            .then(assignments => {
                              for (const a of assignments) {
                                if (a.employeeid !== user.id && a.taskid !== task.id) {
                                  // new employee assigned CREATE it
                                  const assign = new TaskEmployeeAssignment(-1, task.id, user.id);
                                  this.projectService.createTaskEmployeeAssignment(assign);
                                }
                              }
                            });
                        });
                    }
                  }
                });
            }
          }
        });
    });
  }

}

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
})

export class AddProjectDialog {
task: { id: number, title: string, description: string, notice: string, deadline: Date, milestone: boolean };
taskArray: Array<{id: number, title: string, description: string, notice: string, deadline: Date, milestone: boolean}> = [];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  addTask(): void {
    this.task = {
      id: null,
      title: '',
      description: '',
      notice: '',
      deadline: null,
      milestone: false
    };
    const dialogRef = this.dialog.open(AddTask, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.task = result;
      if (!this.task) { return; }

      // this.projectService.createTask(this.task)
      //   .then(t => {
      //     this.tasks.push(t);
      //   });
      this.taskArray.push(this.task);
      this.data.project.tasks = this.taskArray;
    });
  }

  taskdetails(task): void {
    if (!task) { return; }
    this.data.project.tasks = this.data.project.tasks.filter(t => t !== task);
    this.task = task;

    const dialogRef = this.dialog.open(AddTask, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.task = result;
      if (!this.task) { return; }

      this.data.project.tasks.push(this.task);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'add-task',
  templateUrl: './add-task.html'
})

export class AddTask {
  user: { id: number, name: string, email: string};
  userArray: Array<{ id: number, name: string, email: string}> = [];

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddTask>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleEditable(event): void {
      if ( event.checked ) {
           this.data.task.milestone = true;
      } else {
        this.data.task.milestone = false;
      }
  }

  addUser(): void {
    this.user = {
      id: null,
      name: '',
      email: ''
    };
    const dialogRef = this.dialog.open(AddUser, {
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      if (!this.user) { return; }
      // this.projectService.createUser(this.user)
      //   .then(u => {
      //     this.users.push(u);
      //   });
      this.userArray.push(this.user);
      this.data.task.user = this.userArray;
      console.log('users: ' + JSON.stringify(this.data.task.user));
    });
  }

  userdetails(user: Employee) {
    if (!user) { return; }
    this.data.task.user = this.data.task.user.filter(u => u !== user);
    this.userArray = this.userArray.filter(u => u !== user);
    this.user = user;

    const dialogRef = this.dialog.open(AddUser, {
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      if (!this.user) { return; }
      this.userArray.push(this.user);
      this.data.task.user = this.userArray;
      console.log('users: '+ JSON.stringify(this.data.task));
    });
  }

}

@Component({
  selector: 'add-user',
  templateUrl: './add-user.html'
})

export class AddUser {

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddUser>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
