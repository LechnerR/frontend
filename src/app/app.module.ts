import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule } from '@angular/material';
import { MatCheckboxModule, MatTabsModule, MatTooltipModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app/app.component';
import { DashboardComponent, AddProjectDialog, AddTask, AddUser } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectService } from './project/project.service';
import { ProjectSearchComponent } from './project-search/project-search.component';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule, MatCheckboxModule, MatTabsModule, MatTooltipModule, MatDialogModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatGridListModule, MatCheckboxModule, MatTabsModule, MatTooltipModule, MatDialogModule]
})
export class MyOwnCustomMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    TaskDetailComponent,
    DashboardComponent,
    ProjectSearchComponent,
    AddProjectDialog,
    AddTask,
    AddUser
  ],
  entryComponents: [
    AddProjectDialog,
    AddTask,
    AddUser
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    FlexLayoutModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})

export class AppModule { }
