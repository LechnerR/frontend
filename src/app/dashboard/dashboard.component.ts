import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../shared/project';
import { Task } from '../shared/task';
import { User } from '../shared/user';
import { Milestone } from '../shared/milestone';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  project = new Project();

  constructor (
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  addProject(): void {
    let dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.project = result;
      if (!this.project) { return; }

        this.projectService.create(this.project)
          .then(project => {
            this.projects.push(project);
          });
      console.log('project: ' + this.project);
      this.projectService.getProjects().then(projects => this.projects = projects);
    });
  }

}

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
})

export class AddProjectDialog {
tasks: Task[] = [];
milestones: Milestone[] = [];
task = new Task();
mildestone = new Milestone();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  //delete that when finished
  // get diagnostic() { return JSON.stringify(this.data.project); }

  addTask(): void {
    let dialogRef = this.dialog.open(AddTask, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.task = result;
      this.tasks.push(this.task);
      this.data.project.tasks = this.tasks;
      console.log('tasks: '+ JSON.stringify(this.data.project.tasks));
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

  users: User[] = [];
  user = new User();
  milestone = false;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddTask>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleEditable(event) {
      if ( event.checked ) {
           this.milestone = true;
      } else {
        this.milestone = false;
      }
      console.log(this.milestone);
  }

  addUser(): void {
    let dialogRef = this.dialog.open(AddUser, {
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.users.push(this.user);
      this.data.task.user = this.users;
      console.log('users: '+ JSON.stringify(this.data));
    });
  }
  //delete that when finished
  // get diagnostic() { return JSON.stringify(this.data.task); }

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

}
