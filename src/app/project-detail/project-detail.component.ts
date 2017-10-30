import { Component, Input } from '@angular/core';
import { Project } from '../shared/project';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
    @Input() project: Project;

}
