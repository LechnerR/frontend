import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Projektmanagement App';
}
