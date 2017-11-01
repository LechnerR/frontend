import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule, MatTabsModule, MatTooltipModule } from '@angular/material';

import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectsComponent } from './project/projects.component';
import { ProjectService } from './project.service';
import { ProjectSearchComponent } from './project-search/project-search.component';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule, MatTabsModule, MatTooltipModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule, MatTabsModule, MatTooltipModule]
})
export class MyOwnCustomMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    TaskDetailComponent,
    ProjectsComponent,
    DashboardComponent,
    ProjectSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    FlexLayoutModule,
    HttpModule,
    // HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})

export class AppModule { }
