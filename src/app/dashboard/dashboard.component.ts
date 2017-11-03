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
  project: Project;

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
    this.project = new Project();

    let dialogRef = this.dialog.open(AddProjectDialog, {
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.project = result;
      if (!this.project) { return; }

        this.projectService.createProject(this.project)
          .then(project => {
            this.projects.push(project);
          });
      console.log('project: '+ JSON.stringify(this.projects));
    });
  }

  updateProject(project): void {
    
  }

}

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
})

export class AddProjectDialog {
tasks: Task[] = [];
milestones: Milestone[] = [];
task: Task;
milestone: Milestone

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  //delete that when finished
  // get diagnostic() { return JSON.stringify(this.data.project); }

  addTask(): void {
    this.task = new Task();
    let dialogRef = this.dialog.open(AddTask, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.task = result;
      this.data.project.milestones = this.milestones;
      if (this.task.milestone) {
        this.milestone = new Milestone();
        this.milestone.deadline = this.task.deadline;
        this.milestone.title=this.task.title;
        this.projectService.createMilestone(this.milestone)
          .then(ms => {
            this.milestones.push(ms);
          });
      }
      this.projectService.createTask(this.task)
        .then(t => {
          this.tasks.push(t);
        });
      this.data.project.tasks = this.tasks;
      console.log('tasks: '+ JSON.stringify(this.data.project));
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
  user: User;

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
           this.data.task.milestone = true;
      } else {
        this.data.task.milestone = false;
      }
      console.log(this.data.task.milestone);
  }

  addUser(): void {
    this.user = new User();
    let dialogRef = this.dialog.open(AddUser, {
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.users.push(this.user);
      this.data.task.user = this.users;
      console.log('users: '+ JSON.stringify(this.data.task));
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

    onNoClick(): void {
      this.dialogRef.close();
    }
}
