import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ProjectSearchService } from '../project-search.service';
import { Project } from '../shared/project';

@Component({
  selector: 'project-search',
  templateUrl: './project-search.component.html',
  styleUrls: [ './project-search.component.scss' ],
  providers: [ProjectSearchService]
})

export class ProjectSearchComponent implements OnInit {
  projects: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private projectSearchService: ProjectSearchService,
    private router: Router
  ) { }

  // Push a search term into the Observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.projects = this.searchTerms
      .debounceTime(300) // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap(term => term ? this.projectSearchService.search(term) : Observable.of<Project[]>([]))
      .catch(error => {
        // add real error handling
        console.log(error);
        return Observable.of<Project[]>([]);
      });
  }

  gotoDetail(project: Project): void {
    let link = ['/project', project.id];
    this.router.navigate(link);
  }
}
