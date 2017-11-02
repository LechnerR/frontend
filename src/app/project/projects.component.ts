import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../shared/project';
import { Task } from '../shared/task';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;

  project = new Project();
  task = new Task();

  constructor (
    private router: Router,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }
//delete that when finished
get diagnostic() { return JSON.stringify(this.project); }

  getProjects(): void {
    this.projectService
      .getProjects()
      .then(projects => this.projects = projects);
  }



  // addTask(): void {
  //   let dialogRef = this.dialog.open(AddTask, {
  //     data: { task: this.task }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('project: '+ result);
  //     this.task = result;
  //   })
  // }

  // onSubmit(): void {
  //   this.addProject();
  // }

  // add(title: string): void {
  //   title = title.trim();
  //   if (!title) { return; }
  //   this.projectService.create(title)
  //     .then(project => {
  //       this.projects.push(project);
  //       this.selectedProject = null;
  //     });
  // }

  delete(project: Project): void {
    this.projectService
      .delete(project.id)
      .then(() => {
        this.projects = this.projects.filter(p => p !== project);
        if (this.selectedProject === project) { this.selectedProject = null; }
      });
  }

  ngOnInit(): void {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  gotoDetail(): void {
    this.router.navigate(['/project', this.selectedProject.id]);
  }

}

// @Component({
//   selector: 'add-task',
//   templateUrl: './add-task.html'
// })
//
// export class AddTask {
//
//   constructor(
//     public dialogRef: MatDialogRef<AddTask>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }
//
//   onSubmit(): void {
//     this.dialogRef.close();
//   }
//
// }
