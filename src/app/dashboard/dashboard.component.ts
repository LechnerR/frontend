import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../shared/project';
import { Project_task } from '../shared/project_task';
import { Employee } from '../shared/employee';
import { Project_task_assignment } from '../shared/project_task_assignment';
import { Task_employee_assignment } from '../shared/task_employee_assignment';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  project: Project;
  tasks: Project_task[] = [];
  task: Project_task;
  users: Employee[] = [];
  user: Employee;
  p: { start_date: Date, end_date: Date, description: string, title: string, notice: string };

  constructor (
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  delete(project: Project): void {
  this.projectService
      .delete(project.id)
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
    let dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.p }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.p = result;
      if (!this.p) { return; }

        this.projectService.createProject(new Project(this.p['start_date'], this.p['end_date'], this.p['title'], this.p['description'], this.p['notice']))
          .then(project => {

            if (this.p['tasks']) {
              for (let t of this.p['tasks']) {
                this.projectService.createTask(new Project_task(t['title'], t['description'], t['notice'], t['deadline'], t['milestone']))
                  .then(task => {
                    this.projectService.createProjectTaskAssignment(new Project_task_assignment(project.id,task.id));
                    if (t['user']) {
                      for (let u of t['user']) {
                        this.projectService.createUser(new Employee(u['name'], u['email']))
                          .then(user => {
                            this.users.push(user);
                            this.projectService.createTaskEmployeeAssignment(new Task_employee_assignment(task.id, user.id));
                          });
                      }
                    }
                  });
              }
            }
          });
      // console.log('test: ' + this.p['title']);
      // console.log('tasks of project: ' + JSON.stringify(this.p['tasks']));
      // if (this.p['tasks']) {
      //   for (let e of this.p['tasks']) {
      //     console.log('user of tasks: ' + JSON.stringify(e['user']));
      //   }
      // }
      // console.log('project: '+ JSON.stringify(this.p));
      this.projectService.getProjects().then(projects => this.projects = projects);
    });
  }

  updateProject(project: Project): void {
    if(!project) { return; }
    this.p = project;
    let dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.p }
    });

    //nu ned fertig
  }

}

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
})

export class AddProjectDialog {
task: { title: string, description: string, notice: string, deadline: Date, milestone: boolean };
taskArray: Array<{title: string, description: string, notice: string, deadline: Date, milestone: boolean}> = [];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  addTask(): void {
    this.task = {
      title: '',
      description: '',
      notice: '',
      deadline: null,
      milestone: false
    };
    let dialogRef = this.dialog.open(AddTask, {
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

    let dialogRef = this.dialog.open(AddTask, {
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
  user: { name: string, email: string};
  userArray: Array<{ name: string, email: string}> = [];

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
      name: '',
      email: ''
    };
    let dialogRef = this.dialog.open(AddUser, {
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
      console.log('users: '+ JSON.stringify(this.data.task.user));
    });
  }

  userdetails(user: Employee) {
    if (!user) { return; }
    this.data.task.user = this.data.task.user.filter(u => u !== user);
    this.userArray = this.userArray.filter(u => u !== user);
    this.user = user;

    let dialogRef = this.dialog.open(AddUser, {
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
